const React = require('react');
const Default = require('./layouts/Default');

function error404 () {
    return (
        <Default>
            <div>
                <h1>404: PAGE NOT FOUND</h1>
                <p>Oops, sorry, we can't find this page!</p>
                <p><a href="/breads">Go Home</a></p>
            </div>
        </Default>
    )
}

module.exports = error404;