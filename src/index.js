import { marked } from 'marked';

// Inlined CSS (water.css dark theme)
const STYLE_CSS = `/*Check out water.css at https://github.com/kognise/water.css*/
:root{--background-body:#202b38;--background:#161f27;--background-alt:#1a242f;--selection:#161f27;--text-main:#dbdbdb;--text-bright:#fff;--text-muted:#717880;--links:#41adff;--focus:rgba(0,150,191,0.67);--border:#dbdbdb;--code:#ffbe85;--animation-duration:0.1s;--button-hover:#324759;--scrollbar-thumb:var(--button-hover);--scrollbar-thumb-hover:#415c73;--form-placeholder:#a9a9a9;--form-text:#fff;--variable:#d941e2;--highlight:#efdb43;--select-arrow:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='63' width='117' fill='%23efefef'%3E%3Cpath d='M115 2c-1-2-4-2-5 0L59 53 7 2a4 4 0 0 0-5 5l54 54 2 2 3-2 54-54c2-1 2-4 0-5z'/%3E%3C/svg%3E")}@media (prefers-color-scheme:light){:root{--background-body:#fff;--background:#efefef;--background-alt:#f7f7f7;--selection:#9e9e9e;--text-main:#363636;--text-bright:#000;--text-muted:#999;--links:#0076d1;--focus:rgba(0,150,191,0.67);--border:#dbdbdb;--code:#000;--animation-duration:0.1s;--button-hover:#ddd;--scrollbar-thumb:#2c3f4f;--scrollbar-thumb-hover:#202d38;--form-placeholder:#949494;--form-text:#000;--variable:#39a33c;--highlight:#ff0;--select-arrow:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='63' width='117' fill='%23161f27'%3E%3Cpath d='M115 2c-1-2-4-2-5 0L59 53 7 2a4 4 0 0 0-5 5l54 54 2 2 3-2 54-54c2-1 2-4 0-5z'/%3E%3C/svg%3E")}}body{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;line-height:1.4;max-width:800px;margin:20px auto;padding:0 10px;color:var(--text-main);background:var(--background-body);text-rendering:optimizeLegibility}button,input,textarea{transition:background-color var(--animation-duration) linear,border-color var(--animation-duration) linear,color var(--animation-duration) linear,box-shadow var(--animation-duration) linear,transform var(--animation-duration) ease}h1{font-size:2.2em;margin-top:0}h1,h2,h3,h4,h5,h6{margin-bottom:12px}h1,h2,h3,h4,h5,h6,strong{color:var(--text-bright)}b,h1,h2,h3,h4,h5,h6,strong,th{font-weight:600}q:after,q:before{content:none}blockquote,q{border-left:4px solid var(--focus);margin:1.5em 0;padding:.5em 1em;font-style:italic}blockquote>footer{font-style:normal;border:0}address,blockquote cite{font-style:normal}a[href^=mailto]:before{content:"📧 "}a[href^=tel]:before{content:"📞 "}a[href^=sms]:before{content:"💬 "}mark{background-color:var(--highlight);border-radius:2px;padding:0 2px;color:#000}button,input[type=button],input[type=checkbox],input[type=radio],input[type=range],input[type=submit],select{cursor:pointer}input:not([type=checkbox]):not([type=radio]),select{display:block}button,input,select,textarea{color:var(--form-text);background-color:var(--background);font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:none;-webkit-appearance:none}textarea{margin-right:0;width:100%;box-sizing:border-box;resize:vertical}select{background:var(--background) var(--select-arrow) calc(100% - 12px) 50%/12px no-repeat;padding-right:35px}select::-ms-expand{display:none}select[multiple]{padding-right:10px;background-image:none;overflow-y:auto}button,input[type=button],input[type=submit]{padding-right:30px;padding-left:30px}button:hover,input[type=button]:hover,input[type=submit]:hover{background:var(--button-hover)}button:focus,input:focus,select:focus,textarea:focus{box-shadow:0 0 0 2px var(--focus)}input[type=checkbox],input[type=radio]{position:relative;width:14px;height:14px;display:inline-block;vertical-align:middle;margin:0 2px 0 0}input[type=radio]{border-radius:50%}input[type=checkbox]:checked,input[type=radio]:checked{background:var(--button-hover)}input[type=checkbox]:checked:before,input[type=radio]:checked:before{content:"•";display:block;position:absolute;left:50%;top:50%;transform:translateX(-50%) translateY(-50%)}input[type=checkbox]:checked:before{content:"✔";transform:translateY(-50%) translateY(.5px) translateX(-6px)}button:active,input[type=button]:active,input[type=checkbox]:active,input[type=radio]:active,input[type=range]:active,input[type=submit]:active{transform:translateY(2px)}button:disabled,input:disabled,select:disabled,textarea:disabled{cursor:not-allowed;opacity:.5}::-webkit-input-placeholder{color:var(--form-placeholder)}::-moz-placeholder{color:var(--form-placeholder)}::-ms-input-placeholder{color:var(--form-placeholder)}::placeholder{color:var(--form-placeholder)}fieldset{border:1px solid var(--focus);border-radius:6px;margin:0 0 6px;padding:10px}legend{font-size:.9em;font-weight:600}input[type=range]{margin:10px 0;padding:10px 0;background:transparent}input[type=range]:focus{outline:none}input[type=range]::-webkit-slider-runnable-track{width:100%;height:9.5px;transition:.2s;background:var(--background);border-radius:3px}input[type=range]::-webkit-slider-thumb{box-shadow:0 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:var(--border);-webkit-appearance:none;margin-top:-7px}input[type=range]:focus::-webkit-slider-runnable-track{background:var(--background)}input[type=range]::-moz-range-track{width:100%;height:9.5px;transition:.2s;background:var(--background);border-radius:3px}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:var(--border)}input[type=range]::-ms-track{width:100%;height:9.5px;background:transparent;border-color:transparent;border-width:16px 0;color:transparent}input[type=range]::-ms-fill-lower,input[type=range]::-ms-fill-upper{background:var(--background);border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;border:1px solid #000;height:20px;width:20px;border-radius:50%;background:var(--border)}input[type=range]:focus::-ms-fill-lower,input[type=range]:focus::-ms-fill-upper{background:var(--background)}a{text-decoration:none;color:var(--links)}a:hover{text-decoration:underline}code,samp,time{background:var(--background);color:var(--code);padding:2.5px 5px;border-radius:6px;font-size:1em}pre>code{padding:10px;display:block;overflow-x:auto}var{color:var(--variable);font-style:normal;font-family:monospace}kbd{background:var(--background);border:1px solid var(--border);border-radius:2px;color:var(--text-main);padding:2px 4px}img{max-width:100%;height:auto}hr{border:none;border-top:1px solid var(--border)}table{border-collapse:collapse;margin-bottom:10px;width:100%}td,th{padding:6px;text-align:left}thead{border-bottom:1px solid var(--border)}tfoot{border-top:1px solid var(--border)}tbody tr:nth-child(2n){background-color:var(--background-alt)}::-webkit-scrollbar{height:10px;width:10px}::-webkit-scrollbar-track{background:var(--background);border-radius:6px}::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:6px}::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover)}::-moz-selection{background-color:var(--selection)}::selection{background-color:var(--selection)}details{display:flex;flex-direction:column;align-items:flex-start;background-color:var(--background-alt);padding:10px 10px 0;margin:1em 0;border-radius:6px;overflow:hidden}details[open]{padding:10px}details>:last-child{margin-bottom:0}details[open] summary{margin-bottom:10px}summary{display:list-item;background-color:var(--background);padding:10px;margin:-10px -10px 0}details>:not(summary){margin-top:0}summary::-webkit-details-marker{color:var(--text-main)}footer{border-top:1px solid var(--background);padding-top:10px;font-size:.8em;color:var(--text-muted)}
html{height:100%}`;

// Inlined index page HTML
const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>marker</title>
    <meta property="title" content="marker"/>
    <meta property="description" content="Shorten url's and make markdown pages!"/>
    <link rel="stylesheet" href="/static/style.css">
</head>
<body style="display: flex; flex-direction: column; height:94%;">
    <div style="display:flex; margin-top: 10px;">
        <a style="margin-left:auto;margin-right:auto;" href="https://neelr.dev">@neelr</a>
    </div>
    <h1>Hi. This is marker.</h1>
    <p>Shorten your links or make a markup document! Fill in the ID and the markup or the url and enter a password to change it in the future!</p>
    <form method="POST" action="/create">
        <input type="text" name="id" placeholder="ID" required/>
        <input type="url" name="url" placeholder="URL"/>
        <textarea style="height:25vh;" name="markdown" placeholder="markdown"></textarea>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" value="Submit Short"/>
    </form>
    <footer style="margin-top:auto; padding-bottom: 10px;">
        Open Source MIT LICENSE. <a href="https://github.com/neelr/marker">@neelr/markup</a>
    </footer>
</body>
</html>`;

// Template for rendered pages
function renderTemplate(title, content) {
  return `<!DOCTYPE html>
<html>
<head>
    <title>${escapeHtml(title)}</title>
    <meta property="title" content="Custom Markup Page!"/>
    <link rel="stylesheet" href="/static/style.css">
</head>
<body style="display: flex; flex-direction: column;">
    <div style="display:flex; margin-top: 10px;">
        <a style="margin-left:auto;margin-right:auto;" href="https://neelr.dev">@neelr</a>
    </div>
    ${content}
    <footer style="margin-top:auto;">
        Open Source MIT LICENSE. <a href="https://github.com/neelr/marker">@neelr/markup</a>
    </footer>
</body>
</html>`;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

async function handleCreate(request, db) {
  const formData = await request.formData();
  const id = formData.get('id');
  const pass = formData.get('password');
  const uri = formData.get('url') || '';
  const content = formData.get('markdown') || '';

  // Check if record exists
  const existing = await db.prepare('SELECT * FROM shorts WHERE id = ?').bind(id).first();

  if (!existing) {
    // Create new record
    await db.prepare('INSERT INTO shorts (id, pass, content, uri) VALUES (?, ?, ?, ?)')
      .bind(id, pass, content, uri).run();
    return Response.redirect(new URL(`/${id}`, request.url).toString(), 302);
  } else if (existing.pass === pass) {
    // Update existing record
    await db.prepare('UPDATE shorts SET content = ?, uri = ? WHERE id = ?')
      .bind(content, uri, id).run();
    return Response.redirect(new URL(`/${id}`, request.url).toString(), 302);
  } else {
    // Password mismatch
    return new Response(
      renderTemplate('Taken!', '<h4>This record is taken and your password did not match</h4>'),
      { headers: { 'content-type': 'text/html' } }
    );
  }
}

async function handleGet(id, db, requestUrl) {
  const record = await db.prepare('SELECT * FROM shorts WHERE id = ?').bind(id).first();

  if (!record) {
    return new Response(
      renderTemplate('Record Not Found', '<h1>Record Not Found</h1>'),
      { headers: { 'content-type': 'text/html' }, status: 404 }
    );
  }

  // If markdown content exists, render it
  if (record.content && record.content.trim() !== '') {
    const rendered = marked(record.content);
    return new Response(
      renderTemplate(record.id, rendered),
      { headers: { 'content-type': 'text/html' } }
    );
  }

  // Otherwise redirect to URL
  if (record.uri) {
    return Response.redirect(record.uri, 302);
  }

  // No content and no URI
  return new Response(
    renderTemplate('Empty Record', '<h1>This record has no content</h1>'),
    { headers: { 'content-type': 'text/html' } }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Serve index page
    if (pathname === '/') {
      return new Response(INDEX_HTML, {
        headers: { 'content-type': 'text/html' }
      });
    }

    // Serve CSS
    if (pathname === '/static/style.css') {
      return new Response(STYLE_CSS, {
        headers: { 'content-type': 'text/css' }
      });
    }

    // Handle create
    if (pathname === '/create' && request.method === 'POST') {
      return handleCreate(request, env.DB);
    }

    // Handle dynamic ID routes
    const id = pathname.slice(1); // Remove leading /
    if (id && !id.includes('/')) {
      return handleGet(id, env.DB, request.url);
    }

    // 404 for everything else
    return new Response('Not Found', { status: 404 });
  }
};
