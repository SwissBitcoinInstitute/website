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

    let newContent = content;
    const highlightedSlugs = new Set<string>();
    const replacements: Array<{ tokenId: string; match: string; slug: string; shortDefinition: string }> = [];

    for (const item of sortedItems) {
        // Skip if this slug has already been highlighted or if excluded
        if (highlightedSlugs.has(item.slug) || excludedSlugSet.has(item.slug)) continue;

        // Match whole words only, case insensitive. Escape special regex characters.
        const escapedText = item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b(${escapedText})\\b`, 'i');

        if (regex.test(newContent)) {
            // Replace occurrence(s) according to maxReplacementsPerTerm
            let count = 0;
            newContent = newContent.replace(new RegExp(`\\b(${escapedText})\\b`, 'gi'), (match) => {
                // If we've already highlighted this slug in this content, don't highlight it again
                if (count >= maxReplacementsPerTerm || highlightedSlugs.has(item.slug)) return match;

                count++;
                highlightedSlugs.add(item.slug);
                const tokenId = `__GLOSSARY_TOKEN_${item.slug}_${count}__`;
                // Escape quotes in definition for the markdown title attribute
                const safeDef = item.shortDefinition.replace(/"/g, '&quot;');
                replacements.push({ tokenId, match, slug: item.slug, shortDefinition: safeDef });
                return tokenId;
            });
        }
    }

    // Re-insert the actual markdown links using the tokens
    for (const data of replacements) {
        newContent = newContent.replace(data.tokenId, `[${data.match}](/glossary/${data.slug} "${data.shortDefinition}")`);
    }

    return newContent;
}
