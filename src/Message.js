import React, { forwardRef }  from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';
import './Message.css';

const Message = forwardRef((props,ref) => {
    const isUser = props.username === props.message.username;
    
    //console.log("user2: "+props.message.username);
    //console.log("JSON: "+ JSON.stringify(props.username));
    //console.log("user3: "+props.username);
    //console.log("isUser: "+props.message.message);

    return (
        //if isUser true,then show this div. And using ternary opr to style based isUser.
        <div ref= {ref} className={ `message_card ${isUser && 'message_user'}` }>  
            
             <Card className={isUser ? 'message__userCard' : 'message__guestCard'}> 
                <CardContent>
                    <Typography color="white" variant="h5" component="h2">
                        {/* Don't show the username of the current user */}
                        { !isUser && `${props.message.username || 'Anonymous User'}: `} {props.message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
