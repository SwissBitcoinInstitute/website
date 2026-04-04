export interface GlossaryTerm {
    term: string;
    slug: string;
    shortDefinition: string;
    aliases?: string[];
}

interface ProcessOptions {
    excludeSlugs?: string[];
    maxReplacementsPerTerm?: number; // Default: 1
}

/**
 * Processes content to add glossary links for known terms.
 * Returns a markdown string with glossary link placeholders.
 */
export function processGlossaryContent(
    content: string,
    terms: GlossaryTerm[],
    options: ProcessOptions = {}
): string {
    if (!content) return '';
    const { excludeSlugs = [], maxReplacementsPerTerm = 1 } = options;
    const excludedSlugSet = new Set(excludeSlugs);

    // Flatten terms and aliases into a list of "matchable" items
    const matchItems: Array<{ text: string; slug: string; shortDefinition: string }> = [];
    for (const term of terms) {
        // Add the main term
        matchItems.push({ text: term.term, slug: term.slug, shortDefinition: term.shortDefinition });
        // Add all aliases
        if (term.aliases) {
            for (const alias of term.aliases) {
                matchItems.push({ text: alias, slug: term.slug, shortDefinition: term.shortDefinition });
            }
        }
    }

    // Sort match items by length descending to match longer phrases first
    const sortedItems = matchItems.sort((a, b) => b.text.length - a.text.length);

    // Split content into lines to process headings separately
    const lines = content.split('\n');
    const highlightedSlugs = new Set<string>();
    const replacements: Array<{ tokenId: string; match: string; slug: string; shortDefinition: string }> = [];
    let tokenCounter = 0;

    let skipProcessing = false;
    let isInCodeBlock = false;

    const processedLines = lines.map(line => {
        const trimmedLine = line.trim();

        // Handle code block toggle (skip everything inside ``` blocks)
        if (trimmedLine.startsWith('```')) {
            isInCodeBlock = !isInCodeBlock;
            return line;
        }
        if (isInCodeBlock) return line;

        // Handle multi-tag lines (e.g. <!-- no-glossary --> Bitcoin <!-- end-no-glossary -->)
        // We protect these segments so they aren't processed by the glossary logic
        const inlineProtections: string[] = [];
        line = line.replace(/<!-- no-glossary -->([\s\S]*?)<!-- end-no-glossary -->/g, (match, p1) => {
            const tokenId = `__INLINE_GLOSSARY_SKIP_${inlineProtections.length}__`;
            inlineProtections.push(p1);
            return tokenId;
        });

        // Handle single/dangling toggle tags (strip them so they aren't displayed)
        if (line.includes('<!-- no-glossary -->')) {
            skipProcessing = true;
            line = line.replace(/<!-- no-glossary -->/g, '');
        }
        if (line.includes('<!-- end-no-glossary -->')) {
            skipProcessing = false;
            line = line.replace(/<!-- end-no-glossary -->/g, '');
        }

        // Skip processing for headings (lines starting with #)
        if (trimmedLine.startsWith('#')) {
            // Check if this is the "References" section to stop further linking
            if (trimmedLine.toLowerCase().includes('references')) {
                skipProcessing = true;
            }
            // Restore any inline protections before returning
            inlineProtections.forEach((content, i) => {
                line = line.replace(`__INLINE_GLOSSARY_SKIP_${i}__`, content);
            });
            return line;
        }

        // If we are in an ignored section (like References or manual skip), don't process
        if (skipProcessing) {
            // Restore any inline protections before returning
            inlineProtections.forEach((content, i) => {
                line = line.replace(`__INLINE_GLOSSARY_SKIP_${i}__`, content);
            });
            return line;
        }

        let processedLine = line;

        for (const item of sortedItems) {
            // Skip if this slug has already been highlighted enough or if excluded
            if (highlightedSlugs.has(item.slug) || excludedSlugSet.has(item.slug)) continue;

            // Match whole words only, case insensitive. Escape special regex characters.
            const escapedText = item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b(${escapedText})\\b`, 'gi');

            if (regex.test(processedLine)) {
                processedLine = processedLine.replace(regex, (match) => {
                    // Check again inside the replace callback to respect maxReplacementsPerTerm
                    if (highlightedSlugs.has(item.slug)) return match;

                    highlightedSlugs.add(item.slug);
                    tokenCounter++;
                    const tokenId = `__GLOSSARY_TOKEN_${item.slug}_${tokenCounter}__`;
                    // Escape quotes in definition for the markdown title attribute
                    const safeDef = item.shortDefinition.replace(/"/g, '&quot;');
                    replacements.push({ tokenId, match, slug: item.slug, shortDefinition: safeDef });
                    return tokenId;
                });
            }
        }

        // Restore inline protections
        inlineProtections.forEach((content, i) => {
            processedLine = processedLine.replace(`__INLINE_GLOSSARY_SKIP_${i}__`, content);
        });

        return processedLine;
    });

    let newContent = processedLines.join('\n');

    // Re-insert the actual markdown links using the tokens
    for (const data of replacements) {
        newContent = newContent.replace(data.tokenId, `[${data.match}](/glossary/${data.slug} "${data.shortDefinition}")`);
    }

    return newContent;
}
