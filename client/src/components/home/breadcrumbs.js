import React from "react";
import { matchPath, withRouter } from "react-router";
import { NavLink, Route } from "react-router-dom";

const DEFAULT_MATCH_OPTIONS = { exact: true };

export const getBreadcrumbs = ({ routes, location }) => {
  const matches = [];
  const { pathname } = location;

  pathname
    .replace(/\/$/, "")
    .split("/")
    .reduce((previous, current) => {
      const pathSection = `${previous}/${current}`;
      const match = routes.find(({ matchOptions, path }) =>
        matchPath(pathSection, {
          ...(matchOptions || DEFAULT_MATCH_OPTIONS),
          path
        })
      );

      if (match) {
        matches.push({
          component: <Route {...match} />,
          path: pathSection
        });
      }

      return pathSection;
    });

  return matches;
};

export const PureBreadcrumbs = ({ dividerComponent, location, routes }) => {
  const breadcrumbs = getBreadcrumbs({ location, routes });

  return (
    <div>
      {breadcrumbs.map(({ component, path }, index) => (
        <span key={path}>
          <NavLink to={path}>{component}</NavLink>
          {!!(index < breadcrumbs.length - 1) && dividerComponent()}
        </span>
      ))}
    </div>
  );
};

PureBreadcrumbs.defaultProps = {
  dividerComponent: () => "/"
};

export default withRouter(PureBreadcrumbs);
