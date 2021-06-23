import { LaptopMac } from "@material-ui/icons";

function Homepage() {
    return (
        <main className='home'>
        <div className='content'>
            <div className='img'></div>
            <h1>Keep your phone connected</h1>
            <p>WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.</p>
            <p><span style={{marginRight: 5}}><LaptopMac/></span>  WhatsApp is available for Mac.<a style={{marginLeft: 5}} href="https://www.whatsapp.com/download" rel="noreferrer" target="_blank">Get it here</a> </p>
        </div></main>
    )
}

export default Homepage
