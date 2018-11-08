function setTransferDataOnDragStart(event) {
    event.dataTransfer.effectAllowed = 'copy';
    setElementTransferData(event.target, event.dataTransfer);
}

var copyTransferDataTarget = false;

function copyTransferDataOnClick(event) {
    // Allow Shift+Click (Windows) or Command+Click (Mac) to open the link in a new tab
    if (event.shiftKey || event.metaKey) {
        return;
    }

    event.preventDefault();

    copyTransferDataTarget = event.target;
    document.execCommand('copy');
    copyTransferDataTarget = false;
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
    // While in Firefox event.target is the "Copy link" button, in Google Chrome it's not.
    // That's why we have to store the copyTransferDataTarget reference manually.
    if (copyTransferDataTarget && copyTransferDataTarget.hasAttribute && copyTransferDataTarget.hasAttribute('data-transfer_json_ld_ref')) {
        event.preventDefault();
        setElementTransferData(copyTransferDataTarget, event.clipboardData);
    }
});
