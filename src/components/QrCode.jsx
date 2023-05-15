import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QrCode = () => {
    const currentUrl = window.location.href;
    const qrstyle = {
        width: '100px',
        height: '100px',
        color: 'red'
    }

    return (
        <div>
            <QRCodeSVG size={120} bgColor='white' fgColor='#032149' level='M' value={currentUrl} includeMargin={true} />
        </div>
    )
}

export default QrCode