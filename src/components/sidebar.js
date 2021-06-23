import { Divider, Grid, Menu, MenuItem,  Avatar, Toolbar, List, ListItem, ListItemAvatar, ListItemText, IconButton, InputBase } from '@material-ui/core';
import { Chat, MoreVert, Search } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import {SocketContext} from './socket'
import {Link, withRouter} from 'react-router-dom'

 function Sidebar({location}) {
     let friendId = location.pathname.split('/')
     friendId = friendId[friendId.length - 1];
    const [userId, setUserId] = useState('')
    const [contacts, setContacts] = useState([])
    const socket = useContext(SocketContext)
    useEffect(() => {
        socket.on('connect', () => {
            console.log("I connected with id " + socket.id);
            setUserId(socket.id)
        })
        socket.on('disconnect', () =>{
            socket.emit('chat-leave', socket.id)
            socket.on('disconnect', () => {
                socket.removeAllListeners();
             });
        })
        socket.on('contact-list', (sockets) => {
            setContacts(sockets)
        })

        
    })
    
    const [anchorEl, setanchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <div className='sidebar'>
            <div className='nav'>
                <Toolbar variant='dense' className='toolbar sidebar-toolbar'>
                    <Grid justify='space-between' alignItems='center' container>
                        <Grid item><Avatar>U</Avatar></Grid>
                        <Grid item><IconButton><svg id="df9d3429-f0ef-48b5-b5eb-f9d27b2deba6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12.072 1.761a10.05 10.05 0 0 0-9.303 5.65.977.977 0 0 0 1.756.855 8.098 8.098 0 0 1 7.496-4.553.977.977 0 1 0 .051-1.952zM1.926 13.64a10.052 10.052 0 0 0 7.461 7.925.977.977 0 0 0 .471-1.895 8.097 8.097 0 0 1-6.012-6.386.977.977 0 0 0-1.92.356zm13.729 7.454a10.053 10.053 0 0 0 6.201-8.946.976.976 0 1 0-1.951-.081v.014a8.097 8.097 0 0 1-4.997 7.209.977.977 0 0 0 .727 1.813l.02-.009z"></path><path fill="#009588" d="M19 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"></path></svg></IconButton>
                        <IconButton><Chat/></IconButton>
                            <IconButton
                                onClick={(e) => {setOpen(true)
                                setanchorEl(e.currentTarget)
                                }}><MoreVert /></IconButton>
                            <Menu
                            getContentAnchorEl={null} 
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                                anchorEl={anchorEl}
                                id="basic-menu"
                                open={open}
                                onClose={() => setOpen(false)}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => setOpen(false)}>New group</MenuItem>
                                <MenuItem onClick={() => setOpen(false)}>Create a room</MenuItem>
                                <MenuItem onClick={() => setOpen(false)}>Profile</MenuItem>
                                <MenuItem onClick={() => setOpen(false)}>Archived</MenuItem>
                                <MenuItem onClick={() => setOpen(false)}>Starred</MenuItem>
                                <MenuItem onClick={() => setOpen(false)}>Settings</MenuItem>
                                <MenuItem onClick={() => setOpen(false)}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
                <div className='chat-search'>
                    <div className='search-input'>
                        <IconButton size='small' style={{ padding: 2, marginRight: 35, marginLeft: 10 }}>
                            <Search />
                        </IconButton><InputBase
                        style={{fontSize: 15}}
                            margin='dense'
                            placeholder="Search or start a new chat"
                        />
                    </div>
                </div></div>
            <List className='contact_list'>
                {contacts.map((contact, index) => (
                    
                    userId !== contact && <span key={index}><ListItem component={Link} to={`/chat/${contact}`} selected={contact===friendId} button >
                        <ListItemAvatar><Avatar>U</Avatar></ListItemAvatar>
                        <ListItemText primary={contact} secondary='go and learn react it is good for you as a developer' secondaryTypographyProps={{ noWrap: true }} />
                    </ListItem>
                    <Divider light variant="inset" component="li" /></span>
                ))}
            </List>
        </div>
    )
}

export default withRouter(Sidebar)