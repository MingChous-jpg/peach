"""HTTP 入口只负责探活和导航到固定 HTTPS origin。"""
from urllib.parse import quote, urlencode, urlsplit

from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import JSONResponse, RedirectResponse
from starlette.routing import Route


def create_redirect_app(origin: str) -> Starlette:
    target = urlsplit(origin)
    if (target.scheme != "https" or not target.hostname or target.username
            or target.password or target.path not in ("", "/")
            or target.query or target.fragment):
        raise ValueError("redirect origin must be an HTTPS origin")
    origin = origin.rstrip("/")

    async def healthz(request: Request):
        return JSONResponse({"ok": True, "service": "peach-redirect", "scheme": "http"})

    async def redirect(request: Request):
        # 写请求不能因 307/308 在另一个 origin 自动重发口令或正文。
        if request.method not in {"GET", "HEAD"}:
            return JSONResponse({"error": "HTTPS required"}, status_code=426,
                                headers={"Cache-Control": "no-store"})
        # 固定 origin，不使用来访 Host；不转发查询串中的口令。
        query = request.query_params.multi_items()
        query = urlencode([(key, value) for key, value in query if key != "t"])
        location = origin + "/" + quote(request.path_params["path"], safe="/@:")
        if query:
            location += "?" + query
        return RedirectResponse(location, status_code=302,
                                headers={"Cache-Control": "no-store"})

    return Starlette(routes=[
        Route("/healthz", healthz, methods=["GET", "HEAD"]),
        Route("/{path:path}", redirect, methods=["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]),
    ])
