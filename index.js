var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var EMAILDATA = {

    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
}


var Inbox = function(props) {
    return (
        <div>
            <strong>
                <Link to={'/inbox/' + props.id}>
                    {props.title}
                </Link>
                {props.from}
            </strong>
        </div>
    );
};

var Spam = function(props) {
    return (
        <div>
            <strong>
                <Link to={'/spam/' + props.id}>
                    {props.title}
                </Link>
                {props.from}
            </strong>
        </div>
    );
};



var InboxContainer = function(props) {
    var inboxData = Object.keys(props.inboxData).map(function(emailId, index) {
        console.log(emailId, index);
        var inboxContents = props.inboxData[emailId];
        return (
            <div key={index}>

                <Inbox id={inboxContents.id} title={inboxContents.title}
                         from={inboxContents.from} />
            </div>
 //           <li key={index}>
  //              <Spam id={email.id} name={email.title}
    //                     phoneNumber={email.from} />
  //          </li>
        );
    });
            console.log(props.inboxData);
    return (
        <div>
            {inboxData}
        </div>
    );
};



var SpamContainer = function(props) {
    var spamData = Object.keys(props.spamData).map(function(emailId, index) {
        var spamContents = props.spamData[emailId];
        return (
            <li key={index}>
                <Inbox id={spamContents.id} title={spamContents.title}
                         from={spamContents.from} />
            </li>
 //           <li key={index}>
  //              <Spam id={email.id} name={email.title}
    //                     phoneNumber={email.from} />
  //          </li>
        );
    });
            console.log(props.spamData);
    return (
        <ul>
            {spamData}
        </ul>
    );
};

var EmailContainer = function(props){
    console.log(props);
    var email = EMAILDATA[props.params.index];

    return (
        <Inbox 
        id={email.id}
        title={email.title}
        form={email.title}
        />
    );
};

var InboxContWrapper = function() {
    return <InboxContainer inboxData={EMAILDATA.inbox} />;
};

// var InboxContainer = function(props) {
//     var contact = CONTACTS[props.params.contactId];
//     return <Contact id={contact.id} name={contact.name}
//                     phoneNumber={contact.phoneNumber} />;
// };

// var SpamContainer = function(props) {
//     var contact = CONTACTS[props.params.contactId];
//     return <Contact id={contact.id} name={contact.name}
//                     phoneNumber={contact.phoneNumber} />;
// };

var App = function(props) {
    return (
        <div>
            <h1>
                Contacts App
            </h1>
            <div>
                <Link to={'/inbox'}>
                    Inbox
                </Link>
            </div>
            <div>
                <Link to={'/spam'}>
                    Spam
                </Link>
            </div>
            <div>
                {props.children}

            </div>
        </div>
    );
    console.log(props.children)
};


var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/inbox" component={App}>
            <IndexRoute component={InboxContWrapper} />
            <Route path=":inbox" component={EmailContainer} />
        </Route>
        
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});
