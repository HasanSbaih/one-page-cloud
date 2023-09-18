import React from 'react';
import { Button, TextField, Grid , Box, Stack} from '@mui/material';
import GoJSDiagram from './GoDiagram';
import {styled} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import bobApi from './bobApi'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MarkdownTextarea from './MarkDown'
const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }));

const LandingPage = () => {

    const [workspace, setWorkspace] = React.useState({});
    const [id, setId] = React.useState('');
    const [genratedId, setGenratedId] = React.useState('');
    const [biceb, setBiceb] = React.useState('');
    const [search, setSearch] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState('');
    const [openErr, setOpenErr] = React.useState(false);


    const getWorkSpace = () => {
        if(!id) {
            setOpenErr(true)
            setErr('Please Enter Valid ID');
            return
        }
        setLoading(true)
        bobApi.get(`/workspace/${id}`).then((res)=>{
            setLoading(false)
            setWorkspace(res.data);
        }).catch(err => {
            setOpenErr(true)
            setLoading(false)
            setErr('Could not find workspace');
        })
    }

    const getSearchValue = () => {
        if(!search) {
            setOpenErr(true)
            setErr('Please Enter Valid Promot');
            return
        }
        setLoading(true)
        bobApi.post(`/ai/build/`, {
            description: search
        }).then((res)=>{
            setLoading(false)
            setWorkspace(res.data);
        }).catch(err => {
            setOpenErr(true)
            setLoading(false)
            setErr('Could not find Value');
        })
    }

    const SaveWorkspace = () => {
        setLoading(true)
        bobApi.post(`/workspace`, {
           ...workspace
        }).then((res)=> {
            setLoading(false)
            setGenratedId(res.data._id)
        }) .catch((err)=>{
            setLoading(false)
            setErr('Failed To Save');
        })
    }

    const GenrateBicebCommand = () => {
        setLoading(true)
        bobApi.get(`/ai/generate/${genratedId}/?language=bicep`).then((res)=> {
            setLoading(false)
            setBiceb(res.data)
         }) .catch((err)=>{
            setLoading(false)
            setErr('Failed To Genrate Biceb command');
         })
    }
    
    return (
        <Container >
            <Backdrop
                open={loading}
                sx={{ color: '#fff' }}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={openErr} autoHideDuration={6000} >
                <Alert 
                severity="error" 
                variant="filled" 
                sx={{ bgcolor: 'red' }}
                >
                     {err}
                </Alert>
            </Snackbar>
            <h2>Bob The Builder </h2>    
            <h4>Build infrastructure powerd BY AI and ChatGpt</h4>        
          

            <Grid  sx={{maxWidth: 1300,height:250, border:'1px solid', padding:4, float: 'right', marginTop:1}} container spacing={2} alignItems="center">
            {workspace.resources &&
                        <GoJSDiagram data={workspace}></GoJSDiagram>
            }
            </Grid>
            <Box sx={{width:'100%', justifyContent: 'center', alignItems:'center', zIndex:999, textAlign: 'center', alignContent:'center',  marginBottom:10}}>
                    <p>{genratedId}</p>
                    {workspace.resources && <div sx={{zIndex:999}}>                   
                     {genratedId ?
                    <Button sx={{zIndex:999}} onClick={()=>GenrateBicebCommand()} variant="contained" color="primary">
                         Genrate
                    </Button> 
                 :
                    <Button sx={{zIndex:999}} onClick={()=>SaveWorkspace()} variant="contained" color="primary">
                       Save
                    </Button>
                    }
                    {biceb && 
                        <MarkdownTextarea text={biceb}></MarkdownTextarea>
                    }
                    </div>
                }
            </Box>
            <Grid sx={{ marginBottom:10}} container spacing={2} alignItems="center">
                    <Grid item >
                    <TextField sx={{width:200}} onChange={(e) => setId(e.target.value)} fullWidth label="Enter WorkSpace ID" variant="outlined" />
                    </Grid>
                    <Grid item>
                    <Button disabled={!id} sx={{width:100}} onClick={()=>getWorkSpace()} variant="contained" color="primary">
                        Get
                    </Button>
                    </Grid>
                    <Grid item >
                    <TextField sx={{width:450}} onChange={(e) => setSearch(e.target.value)} fullWidth label="Enter the descrption of the infrastructure" variant="outlined" />
                    </Grid>
                    <Grid item>
                    <Button disabled={!search} onClick={()=>getSearchValue()} variant="contained" color="primary">
                       Genrate infrastructure Diagram
                    </Button>
                    </Grid>
            </Grid>
     </Container>
    )
}

export default LandingPage;