dbPassword = 'mongodb+srv://admin:'+ encodeURIComponent('admin') + '@coursereview-bwcik.mongodb.net/test?retryWrites=true';

module.exports = {
    mongoURI: dbPassword
};
//mongodb+srv://admin:<password>@coursereview-bwcik.mongodb.net/test?retryWrites=true&w=majority