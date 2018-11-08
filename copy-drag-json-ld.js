function setTransferDataOnDragStart(event) {
    event.dataTransfer.effectAllowed = 'copy';
    setElementTransferData(event.target, event.dataTransfer);
}

function copyTransferDataOnClick(event) {
    // Allow Shift+Click (Windows) or Command+Click (Mac) to open the link in a new tab
    if (event.shiftKey || event.metaKey) {
        return;
    }

    event.preventDefault();
    document.execCommand('copy');
}

function setElementTransferData(element, dataTransfer) {
    if (element.hasAttribute('href')) {
        const href = element.getAttribute('href');

        if (dataTransfer.getData('text/plain') === '') {
            dataTransfer.setData('text/plain', href);
        }

        if (dataTransfer.getData('text/uri-list') === '') {
            dataTransfer.setData('text/uri-list', href);
        }

        if (dataTransfer.getData('text/html') === '') {
            dataTransfer.setData('text/html', '<a href="' + href + '">' + href + '</a>');
        }
    }

    if (element.hasAttribute('data-transfer_json_ld_ref')) {
        dataTransfer.setData('application/ld+json', document.getElementById(element.getAttribute('data-transfer_json_ld_ref')).innerHTML);
    }
}

document.addEventListener('copy', function (event) {
    if (event.target.hasAttribute && event.target.hasAttribute('data-transfer_json_ld_ref')) {
        event.preventDefault();
        setElementTransferData(event.target, event.clipboardData);
    }
});
