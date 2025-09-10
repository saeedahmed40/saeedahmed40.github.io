document.addEventListener('DOMContentLoaded', function() {
    const badgeDivs = document.querySelectorAll('div[data-share-badge-id]');

    badgeDivs.forEach(div => {
        const badgeId = div.getAttribute('data-share-badge-id');
        const badgeHost = div.getAttribute('data-share-badge-host');
        const width = div.getAttribute('data-iframe-width');
        const height = div.getAttribute('data-iframe-height');

        if (badgeId && badgeHost) {
            const iframeSrc = `${badgeHost}/embed/badge/${badgeId}`;

            const iframe = document.createElement('iframe');

            iframe.src = iframeSrc;
            iframe.width = width || '200';
            iframe.height = height || '270';
            iframe.frameBorder = '0';
            iframe.style.border = '0';
            iframe.style.display = 'block';

            div.parentNode.replaceChild(iframe, div);
        }
    });
});