
var encrptAndDecrypt = {

	encrypt : function(text){
	  	const crypto = require('crypto');
		const cipher = crypto.createCipher('aes192', 'a password');

		var encrypted = cipher.update(text, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		console.log(encrypted); 

		return encrypted;
	},
	decrypt : function(text){
		const crypto = require('crypto');
		const decipher = crypto.createDecipher('aes192', 'a password');

		//var encrypted = '7643356f67a4a151206bb30aa04d47b9';
		var decrypted = decipher.update(text, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		console.log(decrypted);

		return decrypted;
	}
}

module.exports = encrptAndDecrypt;






