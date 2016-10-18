var natural = require('natural');
natural.LogisticRegressionClassifier.load('classifier.json', null, function(err, classifier) {
        console.log(err);
});
