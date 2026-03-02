export interface GlossaryTerm {
    term: string;
    slug: string;
    shortDefinition: string;
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

    // Sort terms by length descending to match longer phrases first (e.g., "Bitcoin Wallet" before "Bitcoin")
    const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);

    let newContent = content;
    const highlightedSlugs = new Set<string>();
    const replacements: Array<{ tokenId: string; match: string; slug: string; shortDefinition: string }> = [];

    for (const term of sortedTerms) {
        // Skip if already highlighted or if excluded
        if (highlightedSlugs.has(term.slug) || excludedSlugSet.has(term.slug)) continue;

        // Match whole words only, case insensitive. Escape special regex characters in the term.
        const escapedTerm = term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b(${escapedTerm})\\b`, 'i');

        if (regex.test(newContent)) {
            // Replace occurrence(s) according to maxReplacementsPerTerm
            let count = 0;
            newContent = newContent.replace(new RegExp(`\\b(${escapedTerm})\\b`, 'gi'), (match) => {
                if (count >= maxReplacementsPerTerm) return match;

                count++;
                highlightedSlugs.add(term.slug);
                const tokenId = `__GLOSSARY_TOKEN_${term.slug}_${count}__`;
                // Escape quotes in definition for the markdown title attribute
                const safeDef = term.shortDefinition.replace(/"/g, '&quot;');
                replacements.push({ tokenId, match, slug: term.slug, shortDefinition: safeDef });
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
