define(
  'ace/snippets/robot.snippets',
  ['require', 'exports', 'module'],
  function (e, t, n) {
    n.exports =
      '# scope: robot\n### Sections\nsnippet settingssection\ndescription *** Settings *** section\n	*** Settings ***\n	Library    ${1}\n\nsnippet keywordssection\ndescription *** Keywords *** section\n	*** Keywords ***\n	${1:Keyword Name}\n	    [Arguments]    \\${${2:Example Arg 1}}\n	\nsnippet testcasessection\ndescription *** Test Cases *** section\n	*** Test Cases ***\n	${1:First Test Case}\n	    ${2:Log    Example Arg}\n\nsnippet variablessection\ndescription *** Variables *** section\n	*** Variables ***\n	\\${${1:Variable Name}}=    ${2:Variable Value}\n\n### Helpful keywords\nsnippet testcase\ndescription A test case\n	${1:Test Case Name}\n	    ${2:Log    Example log message}\n	\nsnippet keyword\ndescription A keyword\n	${1:Example Keyword}\n	    [Arguments]    \\${${2:Example Arg 1}}\n\n### Built Ins\nsnippet forinr\ndescription For In Range Loop\n	FOR    \\${${1:Index}}    IN RANGE     \\${${2:10}}\n	    Log     \\${${1:Index}}\n	END\n\nsnippet forin\ndescription For In Loop\n	FOR    \\${${1:Item}}    IN     @{${2:List Variable}}\n	    Log     \\${${1:Item}}\n	END\n\nsnippet if\ndescription If Statement\n	IF    ${1:condition}\n	    ${2:Do something}\n	END\n\nsnippet else\ndescription If Statement\n	IF    ${1:Condition}\n	    ${2:Do something}\n	ELSE\n	    ${3:Otherwise do this}\n	END\n\nsnippet elif\ndescription Else-If Statement\n	IF    ${1:Condition 1}\n	    ${2:Do something}\n	ELSE IF    ${3:Condition 2}\n	    ${4:Do something else}\n	END\n';
  },
),
  define(
    'ace/snippets/robot',
    ['require', 'exports', 'module', 'ace/snippets/robot.snippets'],
    function (e, t, n) {
      'use strict';
      (t.snippetText = e('./robot.snippets')), (t.scope = 'robot');
    },
  );
(function () {
  window.require(['ace/snippets/robot'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();
