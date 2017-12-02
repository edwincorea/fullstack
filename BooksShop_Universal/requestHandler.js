import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {renderToString} from "react-dom/server";

//React-Router 3
// import {match, RouterContext} from "react-router";
//React-Router 4
import {StaticRouter} from "react-router-dom";

import axios from "axios";

import reducers from "./src/client/reducers";
import routes from "./src/client/routes";

function handleRender(req, res) {
    //Call from server (3001), not proxy(3000)
    axios.get("http://localhost:3001/book")
        .then(function(response) {
            // Step 1: create a redux store on the server
            const store = createStore(reducers, {"books": {"books": response.data}});

            // Step 2: get initial state from the store
            const initialState = JSON.stringify(store.getState())
                .replace(/<\/script/g, "<\\/script")
                .replace(/<!--/g, "<\\!--");

            // Step 3: implement React-Router on the server to intercept client requests,
            // and define what to do with each of them
            
            //React-Router 3
            // const Routes = {
            //     routes: routes,
            //     location: req.url
            // };

            // match(Routes, function(err, redirect, props){
            //     if(err){
            //         res.status(500).send("Error fulfilling the request");
            //     } else if (redirect){
            //         // matches a redirect: redirect to the specified lcoation
            //         res.status(302, redirect.pathname + redirect.search);
            //     } else if (props){
            //         // finds a react component: render to string the component
            //         const reactComponent = renderToString(
            //             <Provider store={store}>
            //                 <RouterContext {...props} />
            //             </Provider>
            //         );

            //         res.status(200).render("idnex", {reactComponent, initialState});
            //     } else {
            //         res.status(404).send("Not Found");
            //     }
            // });

            //React-Router 4
            const context = {};
            //console.log("How context looks like? ", context.url);
            const reactComponent = renderToString(
                <Provider store={store}>
                    <StaticRouter
                        location={req.url}
                        context={context}>
                        {routes}
                    </StaticRouter>
                </Provider>
            );
    
            if (context.url) {
                // can use the 'context.status' that
                // we added in RedirectWithStatus
                res.redirect(context.status, context.url);
            } else {
                res.status(200).render("index", {reactComponent, initialState});
            }
                
        })
        .catch(function(err){
            console.log("#Initial Server-side rendering error", err);
        });
}

module.exports = handleRender;