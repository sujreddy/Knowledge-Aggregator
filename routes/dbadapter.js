
var dbadapter = function(dbadaptername)
{
	this.adapterName = dbadaptername;

	if(dbadaptername == 'mongodb')
		dbadapter.adapter('mongodb',require('./mongo'));

	return dbadapter.adapters[dbadaptername];
}

dbadapter.adapters = {};

dbadapter.adapter = function(name, impl) 
{
  var implementing = 'storebookmark getbookmarks' ;
  console.log('Impl = ' + impl);

  // Check for missing methods
  implementing.split(' ').forEach(function(method, index) {
  	console.log('Method name : ' + method);
    if (!impl.hasOwnProperty(method)) {
      throw 'Invalid adapter! Missing method: ' + method;
    }
  });

  // Save the adapter in the adapter registry
  dbadapter.adapters[name] = impl;
};

dbadapter.prototype.storeboomark = function(item)
{
	console.log(item);
}

dbadapter.prototype.getbookmarks = function(title, privacyType, username, company)
{
	console.log(title);
}

module.exports = dbadapter;