import Homepage from "./pages/homepage";
import Chatpage from "./pages/chatpage";
import SideBar from "./components/sidebar";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SocketContext, socket } from './components/socket';


const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
 
  return (<SocketContext.Provider value={socket}><MuiThemeProvider theme={theme}>
    <div className='app-content'>
    <Router>
      <SideBar />
        <Route exact path='/'><Homepage /></Route>
        <Route exact path='/chat/:id'><Chatpage/></Route>
      </Router>
    </div>
  </MuiThemeProvider></SocketContext.Provider>
  );
}

export default App;
