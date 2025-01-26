import { type RouteConfig, index, route, } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("/goose", "./routes/goose/goose.tsx"),
    route("/map", "./routes/map/map.tsx"),
    route("/end", "./routes/end/end.tsx"),
] satisfies RouteConfig;
