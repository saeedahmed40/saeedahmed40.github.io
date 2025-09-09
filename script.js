function parseCSV(text) {
    const lines = text.trim().split('\n');
    const header = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    const rows = lines.slice(1).map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim().replace(/^"|"$/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim().replace(/^"|"$/g, ''));

        let obj = {};
        header.forEach((h, i) => {
            obj[h] = values[i];
        });
        return obj;
    });
    return rows;
}
function updateSeoTags(keywordsData) {
    if (!keywordsData || keywordsData.length === 0) {
        console.error("No keyword data found.");
        return;
    }

   
    const primaryKeyword = keywordsData[0].Keyword;
    document.title = `${primaryKeyword} | Saeed Ahmed`;

    
    const descriptionKeywords = keywordsData.slice(0, 3).map(item => item.Keyword).join(', ');
    const metaDescription = document.getElementById('meta-description');
    if (metaDescription) {
        metaDescription.setAttribute('content', `Professional portfolio demonstrating expertise in ${descriptionKeywords}.`);
    }

    const allKeywordsString = keywordsData.map(item => item.Keyword).join(', ');
    const metaKeywords = document.getElementById('meta-keywords');
    if (metaKeywords) {
        metaKeywords.setAttribute('content', allKeywordsString);
    }
}


fetch('seo.csv')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.text();
    })
    .then(csvText => {
        const keywordsData = parseCSV(csvText);
        updateSeoTags(keywordsData);
    })
    .catch(error => {
        console.error('Failed to fetch or process CSV:', error);
        document.title = "Error Loading Portfolio";
    });