define(
  'ace/mode/ion_highlight_rules',
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
        var e = 'TRUE|FALSE',
          t = e,
          n =
            'NULL.NULL|NULL.BOOL|NULL.INT|NULL.FLOAT|NULL.DECIMAL|NULL.TIMESTAMP|NULL.STRING|NULL.SYMBOL|NULL.BLOB|NULL.CLOB|NULL.STRUCT|NULL.LIST|NULL.SEXP|NULL',
          r = n,
          i = this.createKeywordMapper(
            {
              'constant.language.bool.ion': t,
              'constant.language.null.ion': r,
            },
            'constant.other.symbol.identifier.ion',
            !0,
          ),
          s = { token: i, regex: '\\b\\w+(?:\\.\\w+)?\\b' };
        (this.$rules = {
          start: [{ include: 'value' }],
          value: [
            { include: 'whitespace' },
            { include: 'comment' },
            { include: 'annotation' },
            { include: 'string' },
            { include: 'number' },
            { include: 'keywords' },
            { include: 'symbol' },
            { include: 'clob' },
            { include: 'blob' },
            { include: 'struct' },
            { include: 'list' },
            { include: 'sexp' },
          ],
          sexp: [
            {
              token: 'punctuation.definition.sexp.begin.ion',
              regex: '\\(',
              push: [
                {
                  token: 'punctuation.definition.sexp.end.ion',
                  regex: '\\)',
                  next: 'pop',
                },
                { include: 'comment' },
                { include: 'value' },
                {
                  token: 'storage.type.symbol.operator.ion',
                  regex:
                    '[\\!\\#\\%\\&\\*\\+\\-\\./\\;\\<\\=\\>\\?\\@\\^\\`\\|\\~]+',
                },
              ],
            },
          ],
          comment: [
            { token: 'comment.line.ion', regex: '//[^\\n]*' },
            {
              token: 'comment.block.ion',
              regex: '/\\*',
              push: [
                { token: 'comment.block.ion', regex: '[*]/', next: 'pop' },
                { token: 'comment.block.ion', regex: '[^*/]+' },
                { token: 'comment.block.ion', regex: '[*/]+' },
              ],
            },
          ],
          list: [
            {
              token: 'punctuation.definition.list.begin.ion',
              regex: '\\[',
              push: [
                {
                  token: 'punctuation.definition.list.end.ion',
                  regex: '\\]',
                  next: 'pop',
                },
                { include: 'comment' },
                { include: 'value' },
                {
                  token: 'punctuation.definition.list.separator.ion',
                  regex: ',',
                },
              ],
            },
          ],
          struct: [
            {
              token: 'punctuation.definition.struct.begin.ion',
              regex: '\\{',
              push: [
                {
                  token: 'punctuation.definition.struct.end.ion',
                  regex: '\\}',
                  next: 'pop',
                },
                { include: 'comment' },
                { include: 'value' },
                {
                  token: 'punctuation.definition.struct.separator.ion',
                  regex: ',|:',
                },
              ],
            },
          ],
          blob: [
            {
              token: [
                'punctuation.definition.blob.begin.ion',
                'string.other.blob.ion',
                'punctuation.definition.blob.end.ion',
              ],
              regex: '(\\{\\{)([^"]*)(\\}\\})',
            },
          ],
          clob: [
            {
              token: [
                'punctuation.definition.clob.begin.ion',
                'string.other.clob.ion',
                'punctuation.definition.clob.end.ion',
              ],
              regex: '(\\{\\{)("[^"]*")(\\}\\})',
            },
          ],
          symbol: [
            {
              token: 'storage.type.symbol.quoted.ion',
              regex: "(['])((?:(?:\\\\')|(?:[^']))*?)(['])",
            },
            {
              token: 'storage.type.symbol.identifier.ion',
              regex: '[\\$_a-zA-Z][\\$_a-zA-Z0-9]*',
            },
          ],
          number: [
            {
              token: 'constant.numeric.timestamp.ion',
              regex:
                '\\d{4}(?:-\\d{2})?(?:-\\d{2})?T(?:\\d{2}:\\d{2})(?::\\d{2})?(?:\\.\\d+)?(?:Z|[-+]\\d{2}:\\d{2})?',
            },
            {
              token: 'constant.numeric.timestamp.ion',
              regex: '\\d{4}-\\d{2}-\\d{2}T?',
            },
            {
              token: 'constant.numeric.integer.binary.ion',
              regex: '-?0[bB][01](?:_?[01])*',
            },
            {
              token: 'constant.numeric.integer.hex.ion',
              regex: '-?0[xX][0-9a-fA-F](?:_?[0-9a-fA-F])*',
            },
            {
              token: 'constant.numeric.float.ion',
              regex:
                '-?(?:0|[1-9](?:_?\\d)*)(?:\\.(?:\\d(?:_?\\d)*)?)?(?:[eE][+-]?\\d+)',
            },
            {
              token: 'constant.numeric.float.ion',
              regex: '(?:[-+]inf)|(?:nan)',
            },
            {
              token: 'constant.numeric.decimal.ion',
              regex:
                '-?(?:0|[1-9](?:_?\\d)*)(?:(?:(?:\\.(?:\\d(?:_?\\d)*)?)(?:[dD][+-]?\\d+)|\\.(?:\\d(?:_?\\d)*)?)|(?:[dD][+-]?\\d+))',
            },
            {
              token: 'constant.numeric.integer.ion',
              regex: '-?(?:0|[1-9](?:_?\\d)*)',
            },
          ],
          string: [
            {
              token: [
                'punctuation.definition.string.begin.ion',
                'string.quoted.double.ion',
                'punctuation.definition.string.end.ion',
              ],
              regex: '(["])((?:(?:\\\\")|(?:[^"]))*?)(["])',
            },
            {
              token: 'punctuation.definition.string.begin.ion',
              regex: "'{3}",
              push: [
                {
                  token: 'punctuation.definition.string.end.ion',
                  regex: "'{3}",
                  next: 'pop',
                },
                { token: 'string.quoted.triple.ion', regex: "(?:\\\\'|[^'])+" },
                { token: 'string.quoted.triple.ion', regex: "'" },
              ],
            },
          ],
          annotation: [
            {
              token: [
                'variable.language.annotation.ion',
                'punctuation.definition.annotation.ion',
              ],
              regex: "('(?:[^']|\\\\\\\\|\\\\')*')\\s*(::)",
            },
            {
              token: [
                'variable.language.annotation.ion',
                'punctuation.definition.annotation.ion',
              ],
              regex: '([\\$_a-zA-Z][\\$_a-zA-Z0-9]*)\\s*(::)',
            },
          ],
          whitespace: [{ token: 'text.ion', regex: '\\s+' }],
        }),
          (this.$rules.keywords = [s]),
          this.normalizeRules();
      };
    r.inherits(s, i), (t.IonHighlightRules = s);
  },
),
  define(
    'ace/mode/partiql_highlight_rules',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/text_highlight_rules',
      'ace/mode/ion_highlight_rules',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../lib/oop'),
        i = e('./text_highlight_rules').TextHighlightRules,
        s = e('./ion_highlight_rules').IonHighlightRules,
        o = function () {
          var e = 'MISSING',
            t = 'FALSE|NULL|TRUE',
            n = e + '|' + t,
            r =
              'PIVOT|UNPIVOT|LIMIT|TUPLE|REMOVE|INDEX|CONFLICT|DO|NOTHING|RETURNING|MODIFIED|NEW|OLD|LET',
            i =
              'ABSOLUTE|ACTION|ADD|ALL|ALLOCATE|ALTER|AND|ANY|ARE|AS|ASC|ASSERTION|AT|AUTHORIZATION|BEGIN|BETWEEN|BIT_LENGTH|BY|CASCADE|CASCADED|CASE|CATALOG|CHAR|CHARACTER_LENGTH|CHAR_LENGTH|CHECK|CLOSE|COLLATE|COLLATION|COLUMN|COMMIT|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS|CONTINUE|CONVERT|CORRESPONDING|CREATE|CROSS|CURRENT|CURSOR|DEALLOCATE|DEC|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DESC|DESCRIBE|DESCRIPTOR|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DROP|ELSE|END|END-EXEC|ESCAPE|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXTERNAL|EXTRACT|FETCH|FIRST|FOR|FOREIGN|FOUND|FROM|FULL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|HAVING|IDENTITY|IMMEDIATE|IN|INDICATOR|INITIALLY|INNER|INPUT|INSENSITIVE|INSERT|INTERSECT|INTERVAL|INTO|IS|ISOLATION|JOIN|KEY|LANGUAGE|LAST|LEFT|LEVEL|LIKE|LOCAL|LOWER|MATCH|MODULE|NAMES|NATIONAL|NATURAL|NCHAR|NEXT|NO|NOT|OCTET_LENGTH|OF|ON|ONLY|OPEN|OPTION|OR|ORDER|OUTER|OUTPUT|OVERLAPS|PAD|PARTIAL|POSITION|PRECISION|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|REAL|REFERENCES|RELATIVE|RESTRICT|REVOKE|RIGHT|ROLLBACK|ROWS|SCHEMA|SCROLL|SECTION|SELECT|SESSION|SET|SIZE|SOME|SPACE|SQL|SQLCODE|SQLERROR|SQLSTATE|TABLE|TEMPORARY|THEN|TIME|TO|TRANSACTION|TRANSLATE|TRANSLATION|UNION|UNIQUE|UNKNOWN|UPDATE|UPPER|USAGE|USER|USING|VALUE|VALUES|VIEW|WHEN|WHENEVER|WHERE|WITH|WORK|WRITE|ZONE',
            o = r + '|' + i,
            u = 'BOOL|BOOLEAN|STRING|SYMBOL|CLOB|BLOB|STRUCT|LIST|SEXP|BAG',
            a =
              'CHARACTER|DATE|DECIMAL|DOUBLE|FLOAT|INT|INTEGER|NUMERIC|SMALLINT|TIMESTAMP|VARCHAR|VARYING',
            f = u + '|' + a,
            l = 'AVG|COUNT|MAX|MIN|SUM',
            c = l,
            h =
              'CAST|COALESCE|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|EXISTS|DATE_ADD|DATE_DIFF|NULLIF|SESSION_USER|SUBSTRING|SYSTEM_USER|TRIM',
            p = h,
            d = this.createKeywordMapper(
              {
                'constant.language.partiql': n,
                'keyword.other.partiql': o,
                'storage.type.partiql': f,
                'support.function.aggregation.partiql': c,
                'support.function.partiql': p,
              },
              'variable.language.identifier.partiql',
              !0,
            ),
            v = { token: d, regex: '\\b\\w+\\b' };
          (this.$rules = {
            start: [
              { include: 'whitespace' },
              { include: 'comment' },
              { include: 'value' },
            ],
            value: [
              { include: 'whitespace' },
              { include: 'comment' },
              { include: 'tuple_value' },
              { include: 'collection_value' },
              { include: 'scalar_value' },
            ],
            scalar_value: [
              { include: 'string' },
              { include: 'number' },
              { include: 'keywords' },
              { include: 'identifier' },
              { include: 'embed-ion' },
              { include: 'operator' },
              { include: 'punctuation' },
            ],
            punctuation: [
              { token: 'punctuation.partiql', regex: '[;:()\\[\\]\\{\\},.]' },
            ],
            operator: [
              {
                token: 'keyword.operator.partiql',
                regex: '[+*/<>=~!@#%&|?^-]+',
              },
            ],
            identifier: [
              {
                token: 'variable.language.identifier.quoted.partiql',
                regex: '(["])((?:(?:\\\\.)|(?:[^"\\\\]))*?)(["])',
              },
              {
                token: 'variable.language.identifier.at.partiql',
                regex: '@\\w+',
              },
              {
                token: 'variable.language.identifier.partiql',
                regex: '\\b\\w+(?:\\.\\w+)?\\b',
              },
            ],
            number: [
              {
                token: 'constant.numeric.partiql',
                regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b',
              },
            ],
            string: [
              {
                token: [
                  'punctuation.definition.string.begin.partiql',
                  'string.quoted.single.partiql',
                  'punctuation.definition.string.end.partiql',
                ],
                regex: "(['])((?:(?:\\\\.)|(?:[^'\\\\]))*?)(['])",
              },
            ],
            collection_value: [
              { include: 'array_value' },
              { include: 'bag_value' },
            ],
            bag_value: [
              {
                token: 'punctuation.definition.bag.begin.partiql',
                regex: '<<',
                push: [
                  {
                    token: 'punctuation.definition.bag.end.partiql',
                    regex: '>>',
                    next: 'pop',
                  },
                  { include: 'comment' },
                  {
                    token: 'punctuation.definition.bag.separator.partiql',
                    regex: ',',
                  },
                  { include: 'value' },
                ],
              },
            ],
            comment: [
              { token: 'comment.line.partiql', regex: '--.*' },
              {
                token: 'comment.block.partiql',
                regex: '/\\*',
                push: 'comment__1',
              },
            ],
            comment__1: [
              { token: 'comment.block.partiql', regex: '[*]/', next: 'pop' },
              { token: 'comment.block.partiql', regex: '[^*/]+' },
              {
                token: 'comment.block.partiql',
                regex: '/\\*',
                push: 'comment__1',
              },
              { token: 'comment.block.partiql', regex: '[*/]+' },
            ],
            array_value: [
              {
                token: 'punctuation.definition.array.begin.partiql',
                regex: '\\[',
                push: [
                  {
                    token: 'punctuation.definition.array.end.partiql',
                    regex: '\\]',
                    next: 'pop',
                  },
                  { include: 'comment' },
                  {
                    token: 'punctuation.definition.array.separator.partiql',
                    regex: ',',
                  },
                  { include: 'value' },
                ],
              },
            ],
            tuple_value: [
              {
                token: 'punctuation.definition.tuple.begin.partiql',
                regex: '\\{',
                push: [
                  {
                    token: 'punctuation.definition.tuple.end.partiql',
                    regex: '\\}',
                    next: 'pop',
                  },
                  { include: 'comment' },
                  {
                    token: 'punctuation.definition.tuple.separator.partiql',
                    regex: ',|:',
                  },
                  { include: 'value' },
                ],
              },
            ],
            whitespace: [{ token: 'text.partiql', regex: '\\s+' }],
          }),
            (this.$rules.keywords = [v]),
            (this.$rules['embed-ion'] = [
              {
                token: 'punctuation.definition.ion.begin.partiql',
                regex: '`',
                next: 'ion-start',
              },
            ]),
            this.embedRules(s, 'ion-', [
              {
                token: 'punctuation.definition.ion.end.partiql',
                regex: '`',
                next: 'start',
              },
            ]),
            this.normalizeRules();
        };
      r.inherits(o, i), (t.PartiqlHighlightRules = o);
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
    'ace/mode/partiql',
    [
      'require',
      'exports',
      'module',
      'ace/lib/oop',
      'ace/mode/text',
      'ace/mode/partiql_highlight_rules',
      'ace/mode/matching_brace_outdent',
      'ace/mode/behaviour/cstyle',
      'ace/mode/folding/cstyle',
    ],
    function (e, t, n) {
      'use strict';
      var r = e('../lib/oop'),
        i = e('./text').Mode,
        s = e('./partiql_highlight_rules').PartiqlHighlightRules,
        o = e('./matching_brace_outdent').MatchingBraceOutdent,
        u = e('./behaviour/cstyle').CstyleBehaviour,
        a = e('./folding/cstyle').FoldMode,
        f = function () {
          (this.HighlightRules = s),
            (this.$outdent = new o()),
            (this.$behaviour = new u()),
            (this.foldingRules = new a());
        };
      r.inherits(f, i),
        function () {
          (this.lineCommentStart = '--'),
            (this.blockComment = { start: '/*', end: '*/', nestable: !0 }),
            (this.getNextLineIndent = function (e, t, n) {
              var r = this.$getIndent(t);
              if (e == 'start') {
                var i = t.match(/^.*[\{\(\[]\s*$/);
                i && (r += n);
              }
              return r;
            }),
            (this.checkOutdent = function (e, t, n) {
              return this.$outdent.checkOutdent(t, n);
            }),
            (this.autoOutdent = function (e, t, n) {
              this.$outdent.autoOutdent(t, n);
            }),
            (this.$id = 'ace/mode/partiql');
        }.call(f.prototype),
        (t.Mode = f);
    },
  );
(function () {
  window.require(['ace/mode/partiql'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();
