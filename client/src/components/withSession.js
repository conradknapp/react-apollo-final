import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../queries";

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => (
      <Component
        {...props}
        session={data}
        loading={loading}
        refetch={refetch}
      />
    )}
  </Query>
);

export default withSession;
