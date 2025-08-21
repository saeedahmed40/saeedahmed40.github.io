document.addEventListener('DOMContentLoaded', function() {
    // Select all div elements that have the 'data-share-badge-id' attribute
    const badgeDivs = document.querySelectorAll('div[data-share-badge-id]');

    // Loop through each of the selected div elements
    badgeDivs.forEach(div => {
        // Get the required attributes from the div
        const badgeId = div.getAttribute('data-share-badge-id');
        const badgeHost = div.getAttribute('data-share-badge-host');
        const width = div.getAttribute('data-iframe-width');
        const height = div.getAttribute('data-iframe-height');

        // Check if we have the minimum required data to proceed
        if (badgeId && badgeHost) {
            // Construct the full iframe source URL
            const iframeSrc = `${badgeHost}/embed/badge/${badgeId}`;

            // Create a new iframe element
            const iframe = document.createElement('iframe');

            // Set the attributes for the iframe
            iframe.src = iframeSrc;
            iframe.width = width || '200'; // Default width if not specified
            iframe.height = height || '270'; // Default height if not specified
            iframe.frameBorder = '0';
            iframe.style.border = '0';
            iframe.style.display = 'block';

            // Replace the original div with the new iframe
            div.parentNode.replaceChild(iframe, div);
        }
    });
});