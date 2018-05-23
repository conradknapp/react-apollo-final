import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import { GET_CURRENT_USER } from "../queries";

const withAuth = conditionFn => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data }) =>
      conditionFn(data) ? <Component {...props} /> : <Redirect to="/" />
    }
  </Query>
);

export default withAuth;
