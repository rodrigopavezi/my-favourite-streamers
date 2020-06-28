import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateWithFirebase } from "../slice";
import { Heading } from "grommet";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Redirect() {
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateWithFirebase(query.get("code"), query.get("state")));
  }, [dispatch, query]);

  return <Heading level="2">Loading...</Heading>;
}
