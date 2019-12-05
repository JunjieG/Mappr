import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import './ChatBox.css';

export default function ChatBox() {
  const [searchQuery, setSearchQuery] = useState('');

  const searchUser = (e) => {
    e.preventDefault();
    if (searchQuery) {
      console.log(`searching for ${searchQuery}`)
      setSearchQuery('');
    }
  }

  const User = () => {
    //$(this).click(function(){
      //var childOffset = $(this).offset();
      //var parentOffset = $(this).parent().parent().offset();
      //var childTop = childOffset.top - parentOffset.top;
      //var clone = $(this).find('img').eq(0).clone();
      //var top = childTop+12+"px";
      
      //$(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");									
      
      //setTimeout(function(){$("#profile p").addClass("animate");$("#profile").addClass("animate");}, 100);
      //setTimeout(function(){
        //$("#chat-messages").addClass("animate");
        //$('.cx, .cy').addClass('s1');
        //setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
        //setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);			
      //}, 150);														
      
      //$('.floatingImg').animate({
        //'width': "68px",
        //'left':'108px',
        //'top':'20px'
      //}, 200);
      
      //var name = $(this).find("p strong").html();
      //var email = $(this).find("p span").html();														
      //$("#profile p").html(name);
      //$("#profile span").html(email);			
      
      //$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
      //$('#friendslist').fadeOut();
      //$('#chatview').fadeIn();
    
      
      //$('#close').unbind("click").click(function(){				
        //$("#chat-messages, #profile, #profile p").removeClass("animate");
        //$('.cx, .cy').removeClass("s1 s2 s3");
        //$('.floatingImg').animate({
          //'width': "40px",
          //'top':top,
          //'left': '12px'
        //}, 200, function(){$('.floatingImg').remove()});				
        
        //setTimeout(function(){
          //$('#chatview').fadeOut();
          //$('#friendslist').fadeIn();				
        //}, 50);
      //});
    //};

    const handleClick = (e) => {
      console.log('clicked', e.currentTarget);
      e.currentTarget.style.opacity = 0;
    }

    return (
      <div className="friend" onClick={((e) => handleClick(e))}>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg" />
          <p>
            <strong>Darnell	Strickland</strong>
            <span>darnellstrickland@gmail.com</span>
          </p>
      </div>
    )
  }

  return ( 
    <div id="chatbox">
      <div id="friendslist">
        <div id="topmenu">
          <span className="friends"></span>
          <span className="room"></span>
          <span className="history"></span>
        </div>
            
        <div id="friends">

          <User />
                
          <div id="search">
            <input 
              type="text"
              id="searchfield"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? searchUser(e) : null}
            />
          </div>
        </div>                
      </div>	
        
      <div id="chatview" className="p1">    	
          <div id="profile">

              <div id="close">
                  <div className="cy"></div>
                  <div className="cx"></div>
              </div>
              
              <p>Miro Badev</p>
              <span>miro@badev@gmail.com</span>
          </div>

          <div id="chat-messages">
            <label>Thursday 02</label>
              <div className="message">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                  <div className="bubble">
                    Really cool stuff!
                      <div className="corner"></div>
                      <span>3 min</span>
                  </div>
              </div>
              
              <div className="message right">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                  <div className="bubble">
                    Can you share a link for the tutorial?
                      <div className="corner"></div>
                      <span>1 min</span>
                  </div>
              </div>
              
              <div className="message">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                  <div className="bubble">
                    Yeah, hold on
                      <div className="corner"></div>
                      <span>Now</span>
                  </div>
              </div>
              
              <div className="message right">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                  <div className="bubble">
                    Can you share a link for the tutorial?
                      <div className="corner"></div>
                      <span>1 min</span>
                  </div>
              </div>
              
              <div className="message">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                  <div className="bubble">
                    Yeah, hold on
                      <div className="corner"></div>
                      <span>Now</span>
                  </div>
              </div>
              
          </div>
        
          <div id="sendmessage">
            <input type="text" value="Send message..." />
              <button id="send"></button>
          </div>
      
      </div>        
    </div>	
    
  )
}
