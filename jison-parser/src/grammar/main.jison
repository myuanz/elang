/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"("                   return '('
")"                   return ')'
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>               return 'EOF'
[_a-zA-Z][_a-zA-Z0-9]*                     return 'IDENTIFIER'
"=" return "="

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF {return $1}
    | stmt {
        console.log('stmt', $1);
        return $1;
    }

    ;
stmt
    : stmt "=" e
    | IDENTIFIER "=" IDENTIFIER
    {
        $$ = {
            type: 'assign',
            left: $1,
            right: $3
        }
    }
    ;

e
    : e '+' e
        {
            $$ = $1+$3;
            console.log('+', $1, $2, $3);
        }
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {
            $$ = parseInt(yytext);
            console.log('num', yytext);
        }
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;
