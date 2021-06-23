import { Grid, Toolbar, IconButton, Avatar, InputBase } from "@material-ui/core";
import { InsertEmoticonSharp, Mic, MoreVert, Search, Send } from '@material-ui/icons';
import { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {SocketContext} from '../components/socket'

function addChatToScreen(msg) {
    const chat_box = document.getElementById('chats');
    const msg_node = document.createElement('p')
    msg_node.innerText = msg
    msg_node.className = 'msg_bubble'
    chat_box.appendChild(msg_node)
}


function sendChat(socket, friendId) {
    const msg = document.getElementById('chat-input').value
    addChatToScreen(msg)
    socket.emit('msg-send', msg, friendId)

}

function Chatpage({match}) {
    let friendId = match.params['id']
    const [isTyping, setIsTyping] = useState(false)
    const socket = useContext(SocketContext)
    useEffect(() => {
        socket.on('msg-receive', (msg, id) =>{
            if (friendId === id){
            addChatToScreen(msg)
            }
        })
        
    })
    
    return (
        <main className='chat'>
            <Toolbar variant='dense' className='toolbar chat-toolbar'>
                <Grid justify='space-between' alignItems='center' container>
                    <div className='contact-details'>
                        <div className='contact-avatar'><Avatar>U</Avatar></div>
                        <div><div>Utibebasi Umanah</div>
                            <div className='last-seen'>last seen today at 12:26</div>
                        </div>
                    </div>
                    <Grid item>
                        <IconButton><Search /></IconButton>
                        <IconButton><MoreVert /></IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
            <div className='chat-box'>
                <div className='chat-box-bg'></div>
                <div id='chats'></div>
            </div>
            <Toolbar variant='dense' className='toolbar bottom-toolbar'>
                <IconButton><InsertEmoticonSharp/></IconButton>
                <IconButton><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg></IconButton>
                <InputBase
                id='chat-input'
                onChange={(e) => {
                    if (e.target.value === ''){
                        setIsTyping(false)
                    }else{
                        setIsTyping(true)
                    }
                    }}
                className='chat-input'
                placeholder='Type a message'
                fullWidth
                        style={{fontSize: 15}}
                            margin='dense'
                        />
                        {isTyping ? <IconButton onClick={() =>sendChat(socket, friendId)}><Send/></IconButton> : <IconButton><Mic/></IconButton> }
            </Toolbar>
        </main>
    )
}

export default withRouter(Chatpage)