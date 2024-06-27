define(
  'ace/mode/xml_highlight_rules',
  [
    'require',
    'exports',
    'module',
    'ace/lib/oop',
    'ace/mode/text_highlight_rules',
  ],
  function (e, t, n) {
    'use strict';
    var r = e('../lib/oop'),
      i = e('./text_highlight_rules').TextHighlightRules,
      s = function (e) {
        var t = '[_:a-zA-Z\u00c0-\uffff][-_:.a-zA-Z0-9\u00c0-\uffff]*';
        (this.$rules = {
          start: [
            {
              token: 'string.cdata.xml',
              regex: '<\\!\\[CDATA\\[',
              next: 'cdata',
            },
            {
              token: ['punctuation.instruction.xml', 'keyword.instruction.xml'],
              regex: '(<\\?)(' + t + ')',
              next: 'processing_instruction',
            },
            { token: 'comment.start.xml', regex: '<\\!--', next: 'comment' },
            {
              token: ['xml-pe.doctype.xml', 'xml-pe.doctype.xml'],
              regex: '(<\\!)(DOCTYPE)(?=[\\s])',
              next: 'doctype',
              caseInsensitive: !0,
            },
            { include: 'tag' },
            { token: 'text.end-tag-open.xml', regex: '</' },
            { token: 'text.tag-open.xml', regex: '<' },
            { include: 'reference' },
            { defaultToken: 'text.xml' },
          ],
          processing_instruction: [
            {
              token: 'entity.other.attribute-name.decl-attribute-name.xml',
              regex: t,
            },
            { token: 'keyword.operator.decl-attribute-equals.xml', regex: '=' },
            { include: 'whitespace' },
            { include: 'string' },
            { token: 'punctuation.xml-decl.xml', regex: '\\?>', next: 'start' },
          ],
          doctype: [
            { include: 'whitespace' },
            { include: 'string' },
            { token: 'xml-pe.doctype.xml', regex: '>', next: 'start' },
            { token: 'xml-pe.xml', regex: '[-_a-zA-Z0-9:]+' },
            {
              token: 'punctuation.int-subset',
              regex: '\\[',
              push: 'int_subset',
            },
          ],
          int_subset: [
            { token: 'text.xml', regex: '\\s+' },
            { token: 'punctuation.int-subset.xml', regex: ']', next: 'pop' },
            {
              token: ['punctuation.markup-decl.xml', 'keyword.markup-decl.xml'],
              regex: '(<\\!)(' + t + ')',
              push: [
                { token: 'text', regex: '\\s+' },
                {
                  token: 'punctuation.markup-decl.xml',
                  regex: '>',
                  next: 'pop',
                },
                { include: 'string' },
              ],
            },
          ],
          cdata: [
            { token: 'string.cdata.xml', regex: '\\]\\]>', next: 'start' },
            { token: 'text.xml', regex: '\\s+' },
            { token: 'text.xml', regex: '(?:[^\\]]|\\](?!\\]>))+' },
          ],
          comment: [
            { token: 'comment.end.xml', regex: '-->', next: 'start' },
            { defaultToken: 'comment.xml' },
          ],
          reference: [
            {
              token: 'constant.language.escape.reference.xml',
              regex:
                '(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)',
            },
          ],
          attr_reference: [
            {
              token: 'constant.language.escape.reference.attribute-value.xml',
              regex:
                '(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)',
            },
          ],
          tag: [
            {
              token: [
                'meta.tag.punctuation.tag-open.xml',
                'meta.tag.punctuation.end-tag-open.xml',
                'meta.tag.tag-name.xml',
              ],
              regex: '(?:(<)|(</))((?:' + t + ':)?' + t + ')',
              next: [
                { include: 'attributes' },
                {
                  token: 'meta.tag.punctuation.tag-close.xml',
                  regex: '/?>',
                  next: 'start',
                },
              ],
            },
          ],
          tag_whitespace: [{ token: 'text.tag-whitespace.xml', regex: '\\s+' }],
          whitespace: [{ token: 'text.whitespace.xml', regex: '\\s+' }],
          string: [
            {
              token: 'string.xml',
              regex: "'",
              push: [
                { token: 'string.xml', regex: "'", next: 'pop' },
                { defaultToken: 'string.xml' },
              ],
            },
            {
              token: 'string.xml',
              regex: '"',
              push: [
                { token: 'string.xml', regex: '"', next: 'pop' },
                { defaultToken: 'string.xml' },
              ],
            },
          ],
          attributes: [
            { token: 'entity.other.attribute-name.xml', regex: t },
            { token: 'keyword.operator.attribute-equals.xml', regex: '=' },
            { include: 'tag_whitespace' },
            { include: 'attribute_value' },
          ],
          attribute_value: [
            {
              token: 'string.attribute-value.xml',
              regex: "'",
              push: [
                {
                  token: 'string.attribute-value.xml',
                  regex: "'",
                  next: 'pop',
                },
                { include: 'attr_reference' },
                { defaultToken: 'string.attribute-value.xml' },
              ],
            },
            {
              token: 'string.attribute-value.xml',
              regex: '"',
              push: [
                {
                  token: 'string.attribute-value.xml',
                  regex: '"',
                  next: 'pop',
                },
                { include: 'attr_reference' },
                { defaultToken: 'string.attribute-value.xml' },
              ],
            },
          ],
        }),
          this.constructor === s && this.normalizeRules();
      };
    (function () {
      this.embedTagRules = function (e, t, n) {
        this.$rules.tag.unshift({
          token: [
            'meta.tag.punctuation.tag-open.xml',
            'meta.tag.' + n + '.tag-name.xml',
          ],
          regex: '(<)(' + n + '(?=\\s|>|$))',
          next: [
            { include: 'attributes' },
            {
              token: 'meta.tag.punctuation.tag-close.xml',
              regex: '/?>',
              next: t + 'start',
            },
          ],
        }),
          (this.$rules[n + '-end'] = [
            { include: 'attributes' },
            {
              token: 'meta.tag.punctuation.tag-close.xml',
              regex: '/?>',
              next: 'start',
              onMatch: function (e, t, n) {
                return n.splice(0), this.token;
              },
            },
          ]),
          this.embedRules(e, t, [
            {
              token: [
                'meta.tag.punctuation.end-tag-open.xml',
                'meta.tag.' + n + '.tag-name.xml',
              ],
              regex: '(</)(' + n + '(?=\\s|>|$))',
              next: n + '-end',
            },
            { token: 'string.cdata.xml', regex: '<\\!\\[CDATA\\[' },
            { token: 'string.cdata.xml', regex: '\\]\\]>' },
          ]);
      };
    }).call(i.prototype),
      r.inherits(s, i),
      (t.XmlHighlightRules = s);
  },
),
  define(
    'ace/mode/behaviour/xml',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/behaviour',
      'ace/token_iterator',
      'ace/lib/lang',
    ],
    function (e, t, n) {
      'use strict';
      function u(e, t) {
        return e && e.type.lastIndexOf(t + '.xml') > -1;
      }
      var r = e('../../lib/oop'),
        i = e('../behaviour').Behaviour,
        s = e('../../token_iterator').TokenIterator,
        o = e('../../lib/lang'),
        a = function () {
          this.add('string_dquotes', 'insertion', function (e, t, n, r, i) {
            if (i == '"' || i == "'") {
              var o = i,
                a = r.doc.getTextRange(n.getSelectionRange());
              if (
                a !== '' &&
                a !== "'" &&
                a != '"' &&
                n.getWrapBehavioursEnabled()
              )
                return { text: o + a + o, selection: !1 };
              var f = n.getCursorPosition(),
                l = r.doc.getLine(f.row),
                c = l.substring(f.column, f.column + 1),
                h = new s(r, f.row, f.column),
                p = h.getCurrentToken();
              if (c == o && (u(p, 'attribute-value') || u(p, 'string')))
                return { text: '', selection: [1, 1] };
              p || (p = h.stepBackward());
              if (!p) return;
              while (u(p, 'tag-whitespace') || u(p, 'whitespace'))
                p = h.stepBackward();
              var d = !c || c.match(/\s/);
              if (
                (u(p, 'attribute-equals') && (d || c == '>')) ||
                (u(p, 'decl-attribute-equals') && (d || c == '?'))
              )
                return { text: o + o, selection: [1, 1] };
            }
          }),
            this.add('string_dquotes', 'deletion', function (e, t, n, r, i) {
              var s = r.doc.getTextRange(i);
              if (!i.isMultiLine() && (s == '"' || s == "'")) {
                var o = r.doc.getLine(i.start.row),
                  u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == s) return i.end.column++, i;
              }
            }),
            this.add('autoclosing', 'insertion', function (e, t, n, r, i) {
              if (i == '>') {
                var o = n.getSelectionRange().start,
                  a = new s(r, o.row, o.column),
                  f = a.getCurrentToken() || a.stepBackward();
                if (
                  !f ||
                  !(
                    u(f, 'tag-name') ||
                    u(f, 'tag-whitespace') ||
                    u(f, 'attribute-name') ||
                    u(f, 'attribute-equals') ||
                    u(f, 'attribute-value')
                  )
                )
                  return;
                if (u(f, 'reference.attribute-value')) return;
                if (u(f, 'attribute-value')) {
                  var l = a.getCurrentTokenColumn() + f.value.length;
                  if (o.column < l) return;
                  if (o.column == l) {
                    var c = a.stepForward();
                    if (c && u(c, 'attribute-value')) return;
                    a.stepBackward();
                  }
                }
                if (/^\s*>/.test(r.getLine(o.row).slice(o.column))) return;
                while (!u(f, 'tag-name')) {
                  f = a.stepBackward();
                  if (f.value == '<') {
                    f = a.stepForward();
                    break;
                  }
                }
                var h = a.getCurrentTokenRow(),
                  p = a.getCurrentTokenColumn();
                if (u(a.stepBackward(), 'end-tag-open')) return;
                var d = f.value;
                h == o.row && (d = d.substring(0, o.column - p));
                if (this.voidElements.hasOwnProperty(d.toLowerCase())) return;
                return { text: '></' + d + '>', selection: [1, 1] };
              }
            }),
            this.add('autoindent', 'insertion', function (e, t, n, r, i) {
              if (i == '\n') {
                var o = n.getCursorPosition(),
                  u = r.getLine(o.row),
                  a = new s(r, o.row, o.column),
                  f = a.getCurrentToken();
                if (f && f.type.indexOf('tag-close') !== -1) {
                  if (f.value == '/>') return;
                  while (f && f.type.indexOf('tag-name') === -1)
                    f = a.stepBackward();
                  if (!f) return;
                  var l = f.value,
                    c = a.getCurrentTokenRow();
                  f = a.stepBackward();
                  if (!f || f.type.indexOf('end-tag') !== -1) return;
                  if (this.voidElements && !this.voidElements[l]) {
                    var h = r.getTokenAt(o.row, o.column + 1),
                      u = r.getLine(c),
                      p = this.$getIndent(u),
                      d = p + r.getTabString();
                    return h && h.value === '</'
                      ? {
                          text: '\n' + d + '\n' + p,
                          selection: [1, d.length, 1, d.length],
                        }
                      : { text: '\n' + d };
                  }
                }
              }
            });
        };
      r.inherits(a, i), (t.XmlBehaviour = a);
    },
  ),
  define(
    'ace/mode/folding/xml',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/lib/lang',
      'ace/range',
      'ace/mode/folding/fold_mode',
      'ace/token_iterator',
    ],
    function (e, t, n) {
      'use strict';
      function l(e, t) {
        return e.type.lastIndexOf(t + '.xml') > -1;
      }
      var r = e('../../lib/oop'),
        i = e('../../lib/lang'),
        s = e('../../range').Range,
        o = e('./fold_mode').FoldMode,
        u = e('../../token_iterator').TokenIterator,
        a = (t.FoldMode = function (e, t) {
          o.call(this),
            (this.voidElements = e || {}),
            (this.optionalEndTags = r.mixin({}, this.voidElements)),
            t && r.mixin(this.optionalEndTags, t);
        });
      r.inherits(a, o);
      var f = function () {
        (this.tagName = ''),
          (this.closing = !1),
          (this.selfClosing = !1),
          (this.start = { row: 0, column: 0 }),
          (this.end = { row: 0, column: 0 });
      };
      (function () {
        (this.getFoldWidget = function (e, t, n) {
          var r = this._getFirstTagInLine(e, n);
          return r
            ? r.closing || (!r.tagName && r.selfClosing)
              ? t == 'markbeginend'
                ? 'end'
                : ''
              : !r.tagName ||
                  r.selfClosing ||
                  this.voidElements.hasOwnProperty(r.tagName.toLowerCase())
                ? ''
                : this._findEndTagInLine(e, n, r.tagName, r.end.column)
                  ? ''
                  : 'start'
            : this.getCommentFoldWidget(e, n);
        }),
          (this.getCommentFoldWidget = function (e, t) {
            return /comment/.test(e.getState(t)) && /<!-/.test(e.getLine(t))
              ? 'start'
              : '';
          }),
          (this._getFirstTagInLine = function (e, t) {
            var n = e.getTokens(t),
              r = new f();
            for (var i = 0; i < n.length; i++) {
              var s = n[i];
              if (l(s, 'tag-open')) {
                (r.end.column = r.start.column + s.value.length),
                  (r.closing = l(s, 'end-tag-open')),
                  (s = n[++i]);
                if (!s) return null;
                (r.tagName = s.value), (r.end.column += s.value.length);
                for (i++; i < n.length; i++) {
                  (s = n[i]), (r.end.column += s.value.length);
                  if (l(s, 'tag-close')) {
                    r.selfClosing = s.value == '/>';
                    break;
                  }
                }
                return r;
              }
              if (l(s, 'tag-close'))
                return (r.selfClosing = s.value == '/>'), r;
              r.start.column += s.value.length;
            }
            return null;
          }),
          (this._findEndTagInLine = function (e, t, n, r) {
            var i = e.getTokens(t),
              s = 0;
            for (var o = 0; o < i.length; o++) {
              var u = i[o];
              s += u.value.length;
              if (s < r) continue;
              if (l(u, 'end-tag-open')) {
                u = i[o + 1];
                if (u && u.value == n) return !0;
              }
            }
            return !1;
          }),
          (this._readTagForward = function (e) {
            var t = e.getCurrentToken();
            if (!t) return null;
            var n = new f();
            do
              if (l(t, 'tag-open'))
                (n.closing = l(t, 'end-tag-open')),
                  (n.start.row = e.getCurrentTokenRow()),
                  (n.start.column = e.getCurrentTokenColumn());
              else if (l(t, 'tag-name')) n.tagName = t.value;
              else if (l(t, 'tag-close'))
                return (
                  (n.selfClosing = t.value == '/>'),
                  (n.end.row = e.getCurrentTokenRow()),
                  (n.end.column = e.getCurrentTokenColumn() + t.value.length),
                  e.stepForward(),
                  n
                );
            while ((t = e.stepForward()));
            return null;
          }),
          (this._readTagBackward = function (e) {
            var t = e.getCurrentToken();
            if (!t) return null;
            var n = new f();
            do {
              if (l(t, 'tag-open'))
                return (
                  (n.closing = l(t, 'end-tag-open')),
                  (n.start.row = e.getCurrentTokenRow()),
                  (n.start.column = e.getCurrentTokenColumn()),
                  e.stepBackward(),
                  n
                );
              l(t, 'tag-name')
                ? (n.tagName = t.value)
                : l(t, 'tag-close') &&
                  ((n.selfClosing = t.value == '/>'),
                  (n.end.row = e.getCurrentTokenRow()),
                  (n.end.column = e.getCurrentTokenColumn() + t.value.length));
            } while ((t = e.stepBackward()));
            return null;
          }),
          (this._pop = function (e, t) {
            while (e.length) {
              var n = e[e.length - 1];
              if (!t || n.tagName == t.tagName) return e.pop();
              if (this.optionalEndTags.hasOwnProperty(n.tagName)) {
                e.pop();
                continue;
              }
              return null;
            }
          }),
          (this.getFoldWidgetRange = function (e, t, n) {
            var r = this._getFirstTagInLine(e, n);
            if (!r)
              return (
                this.getCommentFoldWidget(e, n) &&
                e.getCommentFoldRange(n, e.getLine(n).length)
              );
            var i = r.closing || r.selfClosing,
              o = [],
              a;
            if (!i) {
              var f = new u(e, n, r.start.column),
                l = { row: n, column: r.start.column + r.tagName.length + 2 };
              r.start.row == r.end.row && (l.column = r.end.column);
              while ((a = this._readTagForward(f))) {
                if (a.selfClosing) {
                  if (!o.length)
                    return (
                      (a.start.column += a.tagName.length + 2),
                      (a.end.column -= 2),
                      s.fromPoints(a.start, a.end)
                    );
                  continue;
                }
                if (a.closing) {
                  this._pop(o, a);
                  if (o.length == 0) return s.fromPoints(l, a.start);
                } else o.push(a);
              }
            } else {
              var f = new u(e, n, r.end.column),
                c = { row: n, column: r.start.column };
              while ((a = this._readTagBackward(f))) {
                if (a.selfClosing) {
                  if (!o.length)
                    return (
                      (a.start.column += a.tagName.length + 2),
                      (a.end.column -= 2),
                      s.fromPoints(a.start, a.end)
                    );
                  continue;
                }
                if (!a.closing) {
                  this._pop(o, a);
                  if (o.length == 0)
                    return (
                      (a.start.column += a.tagName.length + 2),
                      a.start.row == a.end.row &&
                        a.start.column < a.end.column &&
                        (a.start.column = a.end.column),
                      s.fromPoints(a.start, c)
                    );
                } else o.push(a);
              }
            }
          });
      }).call(a.prototype);
    },
  ),
  define(
    'ace/mode/xml',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/lib/lang',
      'ace/mode/text',
      'ace/mode/xml_highlight_rules',
      'ace/mode/behaviour/xml',
      'ace/mode/folding/xml',
      'ace/worker/worker_client',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../lib/oop'),
        i = e('../lib/lang'),
        s = e('./text').Mode,
        o = e('./xml_highlight_rules').XmlHighlightRules,
        u = e('./behaviour/xml').XmlBehaviour,
        a = e('./folding/xml').FoldMode,
        f = e('../worker/worker_client').WorkerClient,
        l = function () {
          (this.HighlightRules = o),
            (this.$behaviour = new u()),
            (this.foldingRules = new a());
        };
      r.inherits(l, s),
        function () {
          (this.voidElements = i.arrayToMap([])),
            (this.blockComment = { start: '<!--', end: '-->' }),
            (this.createWorker = function (e) {
              var t = new f(['ace'], 'ace/mode/xml_worker', 'Worker');
              return (
                t.attachToDocument(e.getDocument()),
                t.on('error', function (t) {
                  e.setAnnotations(t.data);
                }),
                t.on('terminate', function () {
                  e.clearAnnotations();
                }),
                t
              );
            }),
            (this.$id = 'ace/mode/xml');
        }.call(l.prototype),
        (t.Mode = l);
    },
  ),
  define(
    'ace/mode/doc_comment_highlight_rules',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/text_highlight_rules',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../lib/oop'),
        i = e('./text_highlight_rules').TextHighlightRules,
        s = function () {
          this.$rules = {
            start: [
              { token: 'comment.doc.tag', regex: '@[\\w\\d_]+' },
              s.getTagRule(),
              { defaultToken: 'comment.doc', caseInsensitive: !0 },
            ],
          };
        };
      r.inherits(s, i),
        (s.getTagRule = function (e) {
          return {
            token: 'comment.doc.tag.storage.type',
            regex: '\\b(?:TODO|FIXME|XXX|HACK)\\b',
          };
        }),
        (s.getStartRule = function (e) {
          return { token: 'comment.doc', regex: '\\/\\*(?=\\*)', next: e };
        }),
        (s.getEndRule = function (e) {
          return { token: 'comment.doc', regex: '\\*\\/', next: e };
        }),
        (t.DocCommentHighlightRules = s);
    },
  ),
  define(
    'ace/mode/javascript_highlight_rules',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/doc_comment_highlight_rules',
      'ace/mode/text_highlight_rules',
    ],
    function (e, t, n) {
      'use strict';
      function a() {
        var e = o.replace('\\d', '\\d\\-'),
          t = {
            onMatch: function (e, t, n) {
              var r = e.charAt(1) == '/' ? 2 : 1;
              if (r == 1)
                t != this.nextState
                  ? n.unshift(this.next, this.nextState, 0)
                  : n.unshift(this.next),
                  n[2]++;
              else if (r == 2 && t == this.nextState) {
                n[1]--;
                if (!n[1] || n[1] < 0) n.shift(), n.shift();
              }
              return [
                {
                  type:
                    'meta.tag.punctuation.' +
                    (r == 1 ? '' : 'end-') +
                    'tag-open.xml',
                  value: e.slice(0, r),
                },
                { type: 'meta.tag.tag-name.xml', value: e.substr(r) },
              ];
            },
            regex: '</?' + e + '',
            next: 'jsxAttributes',
            nextState: 'jsx',
          };
        this.$rules.start.unshift(t);
        var n = { regex: '{', token: 'paren.quasi.start', push: 'start' };
        (this.$rules.jsx = [
          n,
          t,
          { include: 'reference' },
          { defaultToken: 'string' },
        ]),
          (this.$rules.jsxAttributes = [
            {
              token: 'meta.tag.punctuation.tag-close.xml',
              regex: '/?>',
              onMatch: function (e, t, n) {
                return (
                  t == n[0] && n.shift(),
                  e.length == 2 &&
                    (n[0] == this.nextState && n[1]--,
                    (!n[1] || n[1] < 0) && n.splice(0, 2)),
                  (this.next = n[0] || 'start'),
                  [{ type: this.token, value: e }]
                );
              },
              nextState: 'jsx',
            },
            n,
            f('jsxAttributes'),
            { token: 'entity.other.attribute-name.xml', regex: e },
            { token: 'keyword.operator.attribute-equals.xml', regex: '=' },
            { token: 'text.tag-whitespace.xml', regex: '\\s+' },
            {
              token: 'string.attribute-value.xml',
              regex: "'",
              stateName: 'jsx_attr_q',
              push: [
                {
                  token: 'string.attribute-value.xml',
                  regex: "'",
                  next: 'pop',
                },
                { include: 'reference' },
                { defaultToken: 'string.attribute-value.xml' },
              ],
            },
            {
              token: 'string.attribute-value.xml',
              regex: '"',
              stateName: 'jsx_attr_qq',
              push: [
                {
                  token: 'string.attribute-value.xml',
                  regex: '"',
                  next: 'pop',
                },
                { include: 'reference' },
                { defaultToken: 'string.attribute-value.xml' },
              ],
            },
            t,
          ]),
          (this.$rules.reference = [
            {
              token: 'constant.language.escape.reference.xml',
              regex:
                '(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)',
            },
          ]);
      }
      function f(e) {
        return [
          {
            token: 'comment',
            regex: /\/\*/,
            next: [
              i.getTagRule(),
              { token: 'comment', regex: '\\*\\/', next: e || 'pop' },
              { defaultToken: 'comment', caseInsensitive: !0 },
            ],
          },
          {
            token: 'comment',
            regex: '\\/\\/',
            next: [
              i.getTagRule(),
              { token: 'comment', regex: '$|^', next: e || 'pop' },
              { defaultToken: 'comment', caseInsensitive: !0 },
            ],
          },
        ];
      }
      var r = e('../lib/oop'),
        i = e('./doc_comment_highlight_rules').DocCommentHighlightRules,
        s = e('./text_highlight_rules').TextHighlightRules,
        o = '[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*',
        u = function (e) {
          var t = this.createKeywordMapper(
              {
                'variable.language':
                  'Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document',
                keyword:
                  'const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static',
                'storage.type': 'const|let|var|function',
                'constant.language': 'null|Infinity|NaN|undefined',
                'support.function': 'alert',
                'constant.language.boolean': 'true|false',
              },
              'identifier',
            ),
            n =
              'case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void',
            r =
              '\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)';
          this.$rules = {
            no_regex: [
              i.getStartRule('doc-start'),
              f('no_regex'),
              { token: 'string', regex: "'(?=.)", next: 'qstring' },
              { token: 'string', regex: '"(?=.)', next: 'qqstring' },
              {
                token: 'constant.numeric',
                regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/,
              },
              {
                token: 'constant.numeric',
                regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/,
              },
              {
                token: [
                  'storage.type',
                  'punctuation.operator',
                  'support.function',
                  'punctuation.operator',
                  'entity.name.function',
                  'text',
                  'keyword.operator',
                ],
                regex: '(' + o + ')(\\.)(prototype)(\\.)(' + o + ')(\\s*)(=)',
                next: 'function_arguments',
              },
              {
                token: [
                  'storage.type',
                  'punctuation.operator',
                  'entity.name.function',
                  'text',
                  'keyword.operator',
                  'text',
                  'storage.type',
                  'text',
                  'paren.lparen',
                ],
                regex:
                  '(' +
                  o +
                  ')(\\.)(' +
                  o +
                  ')(\\s*)(=)(\\s*)(function)(\\s*)(\\()',
                next: 'function_arguments',
              },
              {
                token: [
                  'entity.name.function',
                  'text',
                  'keyword.operator',
                  'text',
                  'storage.type',
                  'text',
                  'paren.lparen',
                ],
                regex: '(' + o + ')(\\s*)(=)(\\s*)(function)(\\s*)(\\()',
                next: 'function_arguments',
              },
              {
                token: [
                  'storage.type',
                  'punctuation.operator',
                  'entity.name.function',
                  'text',
                  'keyword.operator',
                  'text',
                  'storage.type',
                  'text',
                  'entity.name.function',
                  'text',
                  'paren.lparen',
                ],
                regex:
                  '(' +
                  o +
                  ')(\\.)(' +
                  o +
                  ')(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()',
                next: 'function_arguments',
              },
              {
                token: [
                  'storage.type',
                  'text',
                  'entity.name.function',
                  'text',
                  'paren.lparen',
                ],
                regex: '(function)(\\s+)(' + o + ')(\\s*)(\\()',
                next: 'function_arguments',
              },
              {
                token: [
                  'entity.name.function',
                  'text',
                  'punctuation.operator',
                  'text',
                  'storage.type',
                  'text',
                  'paren.lparen',
                ],
                regex: '(' + o + ')(\\s*)(:)(\\s*)(function)(\\s*)(\\()',
                next: 'function_arguments',
              },
              {
                token: ['text', 'text', 'storage.type', 'text', 'paren.lparen'],
                regex: '(:)(\\s*)(function)(\\s*)(\\()',
                next: 'function_arguments',
              },
              { token: 'keyword', regex: 'from(?=\\s*(\'|"))' },
              { token: 'keyword', regex: '(?:' + n + ')\\b', next: 'start' },
              { token: ['support.constant'], regex: /that\b/ },
              {
                token: [
                  'storage.type',
                  'punctuation.operator',
                  'support.function.firebug',
                ],
                regex:
                  /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/,
              },
              { token: t, regex: o },
              {
                token: 'punctuation.operator',
                regex: /[.](?![.])/,
                next: 'property',
              },
              { token: 'storage.type', regex: /=>/, next: 'start' },
              {
                token: 'keyword.operator',
                regex:
                  /--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,
                next: 'start',
              },
              {
                token: 'punctuation.operator',
                regex: /[?:,;.]/,
                next: 'start',
              },
              { token: 'paren.lparen', regex: /[\[({]/, next: 'start' },
              { token: 'paren.rparen', regex: /[\])}]/ },
              { token: 'comment', regex: /^#!.*$/ },
            ],
            property: [
              { token: 'text', regex: '\\s+' },
              {
                token: [
                  'storage.type',
                  'punctuation.operator',
                  'entity.name.function',
                  'text',
                  'keyword.operator',
                  'text',
                  'storage.type',
                  'text',
                  'entity.name.function',
                  'text',
                  'paren.lparen',
                ],
                regex:
                  '(' +
                  o +
                  ')(\\.)(' +
                  o +
                  ')(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()',
                next: 'function_arguments',
              },
              { token: 'punctuation.operator', regex: /[.](?![.])/ },
              {
                token: 'support.function',
                regex:
                  /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/,
              },
              {
                token: 'support.function.dom',
                regex:
                  /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/,
              },
              {
                token: 'support.constant',
                regex:
                  /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/,
              },
              { token: 'identifier', regex: o },
              { regex: '', token: 'empty', next: 'no_regex' },
            ],
            start: [
              i.getStartRule('doc-start'),
              f('start'),
              { token: 'string.regexp', regex: '\\/', next: 'regex' },
              { token: 'text', regex: '\\s+|^$', next: 'start' },
              { token: 'empty', regex: '', next: 'no_regex' },
            ],
            regex: [
              {
                token: 'regexp.keyword.operator',
                regex: '\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)',
              },
              {
                token: 'string.regexp',
                regex: '/[sxngimy]*',
                next: 'no_regex',
              },
              {
                token: 'invalid',
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/,
              },
              {
                token: 'constant.language.escape',
                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/,
              },
              { token: 'constant.language.delimiter', regex: /\|/ },
              {
                token: 'constant.language.escape',
                regex: /\[\^?/,
                next: 'regex_character_class',
              },
              { token: 'empty', regex: '$', next: 'no_regex' },
              { defaultToken: 'string.regexp' },
            ],
            regex_character_class: [
              {
                token: 'regexp.charclass.keyword.operator',
                regex: '\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)',
              },
              { token: 'constant.language.escape', regex: ']', next: 'regex' },
              { token: 'constant.language.escape', regex: '-' },
              { token: 'empty', regex: '$', next: 'no_regex' },
              { defaultToken: 'string.regexp.charachterclass' },
            ],
            function_arguments: [
              { token: 'variable.parameter', regex: o },
              { token: 'punctuation.operator', regex: '[, ]+' },
              { token: 'punctuation.operator', regex: '$' },
              { token: 'empty', regex: '', next: 'no_regex' },
            ],
            qqstring: [
              { token: 'constant.language.escape', regex: r },
              { token: 'string', regex: '\\\\$', consumeLineEnd: !0 },
              { token: 'string', regex: '"|$', next: 'no_regex' },
              { defaultToken: 'string' },
            ],
            qstring: [
              { token: 'constant.language.escape', regex: r },
              { token: 'string', regex: '\\\\$', consumeLineEnd: !0 },
              { token: 'string', regex: "'|$", next: 'no_regex' },
              { defaultToken: 'string' },
            ],
          };
          if (!e || !e.noES6)
            this.$rules.no_regex.unshift(
              {
                regex: '[{}]',
                onMatch: function (e, t, n) {
                  this.next = e == '{' ? this.nextState : '';
                  if (e == '{' && n.length) n.unshift('start', t);
                  else if (e == '}' && n.length) {
                    n.shift(), (this.next = n.shift());
                    if (
                      this.next.indexOf('string') != -1 ||
                      this.next.indexOf('jsx') != -1
                    )
                      return 'paren.quasi.end';
                  }
                  return e == '{' ? 'paren.lparen' : 'paren.rparen';
                },
                nextState: 'start',
              },
              {
                token: 'string.quasi.start',
                regex: /`/,
                push: [
                  { token: 'constant.language.escape', regex: r },
                  { token: 'paren.quasi.start', regex: /\${/, push: 'start' },
                  { token: 'string.quasi.end', regex: /`/, next: 'pop' },
                  { defaultToken: 'string.quasi' },
                ],
              },
            ),
              (!e || e.jsx != 0) && a.call(this);
          this.embedRules(i, 'doc-', [i.getEndRule('no_regex')]),
            this.normalizeRules();
        };
      r.inherits(u, s), (t.JavaScriptHighlightRules = u);
    },
  ),
  define(
    'ace/mode/matching_brace_outdent',
    ['require', 'exports', 'module', 'ace/range'],
    function (e, t, n) {
      'use strict';
      var r = e('../range').Range,
        i = function () {};
      (function () {
        (this.checkOutdent = function (e, t) {
          return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1;
        }),
          (this.autoOutdent = function (e, t) {
            var n = e.getLine(t),
              i = n.match(/^(\s*\})/);
            if (!i) return 0;
            var s = i[1].length,
              o = e.findMatchingBracket({ row: t, column: s });
            if (!o || o.row == t) return 0;
            var u = this.$getIndent(e.getLine(o.row));
            e.replace(new r(t, 0, t, s - 1), u);
          }),
          (this.$getIndent = function (e) {
            return e.match(/^\s*/)[0];
          });
      }).call(i.prototype),
        (t.MatchingBraceOutdent = i);
    },
  ),
  define(
    'ace/mode/folding/cstyle',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/range',
      'ace/mode/folding/fold_mode',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../../lib/oop'),
        i = e('../../range').Range,
        s = e('./fold_mode').FoldMode,
        o = (t.FoldMode = function (e) {
          e &&
            ((this.foldingStartMarker = new RegExp(
              this.foldingStartMarker.source.replace(
                /\|[^|]*?$/,
                '|' + e.start,
              ),
            )),
            (this.foldingStopMarker = new RegExp(
              this.foldingStopMarker.source.replace(/\|[^|]*?$/, '|' + e.end),
            )));
        });
      r.inherits(o, s),
        function () {
          (this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/),
            (this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/),
            (this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/),
            (this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/),
            (this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/),
            (this._getFoldWidgetBase = this.getFoldWidget),
            (this.getFoldWidget = function (e, t, n) {
              var r = e.getLine(n);
              if (
                this.singleLineBlockCommentRe.test(r) &&
                !this.startRegionRe.test(r) &&
                !this.tripleStarBlockCommentRe.test(r)
              )
                return '';
              var i = this._getFoldWidgetBase(e, t, n);
              return !i && this.startRegionRe.test(r) ? 'start' : i;
            }),
            (this.getFoldWidgetRange = function (e, t, n, r) {
              var i = e.getLine(n);
              if (this.startRegionRe.test(i))
                return this.getCommentRegionBlock(e, i, n);
              var s = i.match(this.foldingStartMarker);
              if (s) {
                var o = s.index;
                if (s[1]) return this.openingBracketBlock(e, s[1], n, o);
                var u = e.getCommentFoldRange(n, o + s[0].length, 1);
                return (
                  u &&
                    !u.isMultiLine() &&
                    (r
                      ? (u = this.getSectionRange(e, n))
                      : t != 'all' && (u = null)),
                  u
                );
              }
              if (t === 'markbegin') return;
              var s = i.match(this.foldingStopMarker);
              if (s) {
                var o = s.index + s[0].length;
                return s[1]
                  ? this.closingBracketBlock(e, s[1], n, o)
                  : e.getCommentFoldRange(n, o, -1);
              }
            }),
            (this.getSectionRange = function (e, t) {
              var n = e.getLine(t),
                r = n.search(/\S/),
                s = t,
                o = n.length;
              t += 1;
              var u = t,
                a = e.getLength();
              while (++t < a) {
                n = e.getLine(t);
                var f = n.search(/\S/);
                if (f === -1) continue;
                if (r > f) break;
                var l = this.getFoldWidgetRange(e, 'all', t);
                if (l) {
                  if (l.start.row <= s) break;
                  if (l.isMultiLine()) t = l.end.row;
                  else if (r == f) break;
                }
                u = t;
              }
              return new i(s, o, u, e.getLine(u).length);
            }),
            (this.getCommentRegionBlock = function (e, t, n) {
              var r = t.search(/\s*$/),
                s = e.getLength(),
                o = n,
                u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
                a = 1;
              while (++n < s) {
                t = e.getLine(n);
                var f = u.exec(t);
                if (!f) continue;
                f[1] ? a-- : a++;
                if (!a) break;
              }
              var l = n;
              if (l > o) return new i(o, r, l, t.length);
            });
        }.call(o.prototype);
    },
  ),
  define(
    'ace/mode/javascript',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/text',
      'ace/mode/javascript_highlight_rules',
      'ace/mode/matching_brace_outdent',
      'ace/worker/worker_client',
      'ace/mode/behaviour/cstyle',
      'ace/mode/folding/cstyle',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../lib/oop'),
        i = e('./text').Mode,
        s = e('./javascript_highlight_rules').JavaScriptHighlightRules,
        o = e('./matching_brace_outdent').MatchingBraceOutdent,
        u = e('../worker/worker_client').WorkerClient,
        a = e('./behaviour/cstyle').CstyleBehaviour,
        f = e('./folding/cstyle').FoldMode,
        l = function () {
          (this.HighlightRules = s),
            (this.$outdent = new o()),
            (this.$behaviour = new a()),
            (this.foldingRules = new f());
        };
      r.inherits(l, i),
        function () {
          (this.lineCommentStart = '//'),
            (this.blockComment = { start: '/*', end: '*/' }),
            (this.$quotes = { '"': '"', "'": "'", '`': '`' }),
            (this.getNextLineIndent = function (e, t, n) {
              var r = this.$getIndent(t),
                i = this.getTokenizer().getLineTokens(t, e),
                s = i.tokens,
                o = i.state;
              if (s.length && s[s.length - 1].type == 'comment') return r;
              if (e == 'start' || e == 'no_regex') {
                var u = t.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);
                u && (r += n);
              } else if (e == 'doc-start') {
                if (o == 'start' || o == 'no_regex') return '';
                var u = t.match(/^\s*(\/?)\*/);
                u && (u[1] && (r += ' '), (r += '* '));
              }
              return r;
            }),
            (this.checkOutdent = function (e, t, n) {
              return this.$outdent.checkOutdent(t, n);
            }),
            (this.autoOutdent = function (e, t, n) {
              this.$outdent.autoOutdent(t, n);
            }),
            (this.createWorker = function (e) {
              var t = new u(
                ['ace'],
                'ace/mode/javascript_worker',
                'JavaScriptWorker',
              );
              return (
                t.attachToDocument(e.getDocument()),
                t.on('annotate', function (t) {
                  e.setAnnotations(t.data);
                }),
                t.on('terminate', function () {
                  e.clearAnnotations();
                }),
                t
              );
            }),
            (this.$id = 'ace/mode/javascript'),
            (this.snippetFileId = 'ace/snippets/javascript');
        }.call(l.prototype),
        (t.Mode = l);
    },
  ),
  define(
    'ace/mode/svg_highlight_rules',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/javascript_highlight_rules',
      'ace/mode/xml_highlight_rules',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../lib/oop'),
        i = e('./javascript_highlight_rules').JavaScriptHighlightRules,
        s = e('./xml_highlight_rules').XmlHighlightRules,
        o = function () {
          s.call(this),
            this.embedTagRules(i, 'js-', 'script'),
            this.normalizeRules();
        };
      r.inherits(o, s), (t.SvgHighlightRules = o);
    },
  ),
  define(
    'ace/mode/folding/mixed',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/folding/fold_mode',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../../lib/oop'),
        i = e('./fold_mode').FoldMode,
        s = (t.FoldMode = function (e, t) {
          (this.defaultMode = e), (this.subModes = t);
        });
      r.inherits(s, i),
        function () {
          (this.$getMode = function (e) {
            typeof e != 'string' && (e = e[0]);
            for (var t in this.subModes)
              if (e.indexOf(t) === 0) return this.subModes[t];
            return null;
          }),
            (this.$tryMode = function (e, t, n, r) {
              var i = this.$getMode(e);
              return i ? i.getFoldWidget(t, n, r) : '';
            }),
            (this.getFoldWidget = function (e, t, n) {
              return (
                this.$tryMode(e.getState(n - 1), e, t, n) ||
                this.$tryMode(e.getState(n), e, t, n) ||
                this.defaultMode.getFoldWidget(e, t, n)
              );
            }),
            (this.getFoldWidgetRange = function (e, t, n) {
              var r = this.$getMode(e.getState(n - 1));
              if (!r || !r.getFoldWidget(e, t, n))
                r = this.$getMode(e.getState(n));
              if (!r || !r.getFoldWidget(e, t, n)) r = this.defaultMode;
              return r.getFoldWidgetRange(e, t, n);
            });
        }.call(s.prototype);
    },
  ),
  define(
    'ace/mode/svg',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/xml',
      'ace/mode/javascript',
      'ace/mode/svg_highlight_rules',
      'ace/mode/folding/mixed',
      'ace/mode/folding/xml',
      'ace/mode/folding/cstyle',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../lib/oop'),
        i = e('./xml').Mode,
        s = e('./javascript').Mode,
        o = e('./svg_highlight_rules').SvgHighlightRules,
        u = e('./folding/mixed').FoldMode,
        a = e('./folding/xml').FoldMode,
        f = e('./folding/cstyle').FoldMode,
        l = function () {
          i.call(this),
            (this.HighlightRules = o),
            this.createModeDelegates({ 'js-': s }),
            (this.foldingRules = new u(new a(), { 'js-': new f() }));
        };
      r.inherits(l, i),
        function () {
          (this.getNextLineIndent = function (e, t, n) {
            return this.$getIndent(t);
          }),
            (this.$id = 'ace/mode/svg');
        }.call(l.prototype),
        (t.Mode = l);
    },
  );
(function () {
  window.require(['ace/mode/svg'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();
