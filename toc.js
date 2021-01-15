function createArticle()
{
    let article = document.createElement("article");
    article.innerHTML = "<p>Loading article...</p>";
    $("#articles")[0].appendChild(article);

    return article;
}

function createSidebarLink(text, href)
{
    let linkContainer = document.createElement("li");

    let link = document.createElement( (typeof(href) === "undefined") ? "p" : "a" );
    link.innerText = text;
    link.href = href;
    linkContainer.appendChild(link);

    $("#sidebar > ul")[0].appendChild(linkContainer);

    return linkContainer;
}

function loadToc(callback)
{
    if (typeof(hostUrl) != "undefined")
    {
        $.get(hostUrl + "content.php", null, function(response) { callback(JSON.parse(response)); });
    }
    else
    {
        console.warn("Host URL is undefined");
    }

    return undefined;
}

function loadArticle(name)
{
    let article = createArticle();
    if (typeof(hostUrl) != "undefined")
    {
        $.get(hostUrl + "article.php", {article: name}, function (response) { article.innerHTML = response; });
    }
    else
    {
        console.warn("Host URL is undefined");
    }
}

function loadContent(pageName)
{
    loadToc(function(result) {
        $("#pagename")[0].innerText = result.pages[pageName].name;

        for (let page in result.pages)
        {
            let link = (page === pageName) ? undefined : "./" + page + ".html";
            createSidebarLink(result.pages[page].name, link);
        }

        let articles = result.pages[pageName].articles;
        for (let articleName of articles)
        {
            loadArticle(articleName);
        }
    });
}