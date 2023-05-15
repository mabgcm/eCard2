import React from 'react'

const Vcard = ({ cards }) => {

    const [base64Image, setBase64Image] = React.useState('');

    const handleDownload = () => {
        // Create the vCard data
        console.log(cards)
        const vCardData = `
BEGIN:VCARD
VERSION:3.0
N:${cards[0].fullname}
FN:${cards[0].fullname}
ORG:${cards[0].company ? cards[0].company : ''}
TITLE:${cards[0].title ? cards[0].title : ''}
PHOTO;VALUE=URL;TYPE=GIF,PNG,JPEG,JPG:${cards[0].imgUrl ? cards[0].imgUrl : ''}
TEL;TYPE=WORK,VOICE:${cards[0].workphone ? cards[0].workphone : ''}
TEL;TYPE=HOME,VOICE:${cards[0].homephone ? cards[0].homephone : ''}
TEL;TYPE=CELL,VOICE:${cards[0].mobilephone}
ADR;TYPE=WORK:${cards[0].workaddress ? cards[0].workaddress : ''}
ADR;TYPE=HOME:${cards[0].homeaddress ? cards[0].homeaddress : ''}
EMAIL:${cards[0].email ? cards[0].email : ''}
URL:${cards[0].website ? cards[0].website : ''}
BDAY:${cards[0].dob ? cards[0].dob : ''}
X-SOCIALPROFILE;type=facebook:${cards[0].facebook ? cards[0].facebook : ''}
X-SOCIALPROFILE;type=twitter:${cards[0].twitter ? cards[0].twitter : ''}
X-SOCIALPROFILE;type=instagram:${cards[0].instagram ? cards[0].instagram : ''}
X-SOCIALPROFILE;type=github:${cards[0].github ? cards[0].github : ''}
END:VCARD`;

        if (cards[0].imgUrl instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
                console.log(reader.result); // The Base64 data will be logged to the console
            };
            reader.readAsDataURL(cards[0].imgUrl);
        }


        console.log(cards[0].fullname)
        // Create a link and click it to download the vCard file
        const vCardBlob = new Blob([vCardData], { type: 'text/x-vCard' });
        const vCardURL = window.URL.createObjectURL(vCardBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = vCardURL;
        downloadLink.download = `${cards[0].fullname}.vcf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(vCardURL);
    };

    return (
        <div className='d-flex justify-content-center'>
            <button className='btn btn-success' onClick={handleDownload}>Download</button>
        </div>
    );
};


export default Vcard