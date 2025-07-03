let profilePicture = '';

function loadImage(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        profilePicture = e.target.result;
        updatePreview();
    }
    reader.readAsDataURL(event.target.files[0]);
}

function generateQRCode(text) {
    const qr = new QRious({
        value: text,
        size: 160,
        level: 'H',
        background: 'white',
        foreground: 'black'
    });
    return qr.toDataURL();
}

function updatePreview() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const slogan = document.getElementById('slogan').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value;
    const address = document.getElementById('address').value;

    const qrData = `BEGIN:VCARD
VERSION:3.0
N:${name}
TITLE:${title}
ORG:${company}
TEL:${phone}
EMAIL:${email}
URL:${website}
ADR:${address}
NOTE:${slogan}
END:VCARD`;

    const qrCodeURL = generateQRCode(qrData);

    let html = '';
    if (profilePicture) {
        html += `<img src=\"${profilePicture}\" alt=\"Profile\">`;
    }
    html += `<h2>${name}</h2>`;
    html += `<h3>${title}</h3>`;
    html += `<p><strong>${company}</strong></p>`;
    html += `<p>${slogan}</p>`;
    html += `<p>📞 ${phone}</p>`;
    html += `<p>✉️ ${email}</p>`;
    html += `<p>🌐 ${website}</p>`;
    html += `<p>📍 ${address}</p>`;
    html += `<div class=\"qr-code\"><img src=\"${qrCodeURL}\" alt=\"QR Code\"></div>`;

    document.getElementById('card-preview').innerHTML = html;
}

function downloadPNG() {
    html2canvas(document.getElementById('card-preview')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'business_card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
