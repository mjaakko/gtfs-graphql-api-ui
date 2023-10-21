/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Agency = {
  __typename?: 'Agency';
  agencyId: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  fareUrl?: Maybe<Scalars['String']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  routes: Array<Route>;
  timezone: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

/**  Describes a type that can have a location. Coordinates can be null if the location is unknown */
export type Location = {
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  agencies: Array<Agency>;
  routes: Array<Route>;
  stop?: Maybe<Stop>;
  stops: Array<Stop>;
  stopsNearby: Array<Stop>;
  trip?: Maybe<TripInstance>;
};


export type QueryStopArgs = {
  id: Scalars['String']['input'];
};


export type QueryStopsNearbyArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  radius: Scalars['Float']['input'];
};


export type QueryTripArgs = {
  date: Scalars['Date']['input'];
  id: Scalars['String']['input'];
};

export type Route = {
  __typename?: 'Route';
  agency?: Maybe<Agency>;
  longName?: Maybe<Scalars['String']['output']>;
  routeId: Scalars['String']['output'];
  shortName?: Maybe<Scalars['String']['output']>;
  trips: Array<TripInstance>;
};


export type RouteTripsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};

export type ScheduleRow = {
  arrivalTimeScheduled?: Maybe<Scalars['Timestamp']['output']>;
  departureTimeScheduled?: Maybe<Scalars['Timestamp']['output']>;
  dropOff: Scalars['Boolean']['output'];
  headsign?: Maybe<Scalars['String']['output']>;
  pickUp: Scalars['Boolean']['output'];
};

export type Stop = Location & {
  __typename?: 'Stop';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  scheduleRows: Array<StopScheduleRow>;
  stopId: Scalars['String']['output'];
  timezone?: Maybe<Scalars['String']['output']>;
};


export type StopScheduleRowsArgs = {
  includeLastStop?: InputMaybe<Scalars['Boolean']['input']>;
  max?: InputMaybe<Scalars['Int']['input']>;
};

export type StopScheduleRow = ScheduleRow & {
  __typename?: 'StopScheduleRow';
  arrivalTimeScheduled?: Maybe<Scalars['Timestamp']['output']>;
  departureTimeScheduled?: Maybe<Scalars['Timestamp']['output']>;
  dropOff: Scalars['Boolean']['output'];
  headsign?: Maybe<Scalars['String']['output']>;
  pickUp: Scalars['Boolean']['output'];
  trip: TripInstance;
};

export type Subscription = {
  __typename?: 'Subscription';
  vehiclePositions: Array<VehiclePosition>;
};

export type TripInstance = {
  __typename?: 'TripInstance';
  date: Scalars['Date']['output'];
  headsign?: Maybe<Scalars['String']['output']>;
  route: Route;
  scheduleRows: Array<TripScheduleRow>;
  shape?: Maybe<Scalars['String']['output']>;
  tripId: Scalars['String']['output'];
  vehiclePosition?: Maybe<VehiclePosition>;
};

export type TripScheduleRow = ScheduleRow & {
  __typename?: 'TripScheduleRow';
  arrivalTimeScheduled?: Maybe<Scalars['Timestamp']['output']>;
  departureTimeScheduled?: Maybe<Scalars['Timestamp']['output']>;
  dropOff: Scalars['Boolean']['output'];
  headsign?: Maybe<Scalars['String']['output']>;
  pickUp: Scalars['Boolean']['output'];
  sequenceNumber: Scalars['Int']['output'];
  stop: Stop;
};

export type VehiclePosition = Location & {
  __typename?: 'VehiclePosition';
  bearing?: Maybe<Scalars['Float']['output']>;
  currentStop?: Maybe<TripScheduleRow>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  speed?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<VehicleStopStatus>;
  timestamp?: Maybe<Scalars['Timestamp']['output']>;
  trip: TripInstance;
  vehicleId: Scalars['String']['output'];
  vehicleLabel?: Maybe<Scalars['String']['output']>;
};

export enum VehicleStopStatus {
  IncomingAt = 'INCOMING_AT',
  InTransitTo = 'IN_TRANSIT_TO',
  StoppedAt = 'STOPPED_AT'
}

export type StopScheduleRowsQueryVariables = Exact<{
  stopId: Scalars['String']['input'];
  maxRows: Scalars['Int']['input'];
}>;


export type StopScheduleRowsQuery = { __typename?: 'Query', stop?: { __typename?: 'Stop', scheduleRows: Array<{ __typename?: 'StopScheduleRow', headsign?: string | null, arrivalTimeScheduled?: any | null, departureTimeScheduled?: any | null, pickUp: boolean, dropOff: boolean, trip: { __typename?: 'TripInstance', tripId: string, date: any, headsign?: string | null, route: { __typename?: 'Route', agency?: { __typename?: 'Agency', timezone: string } | null } } }> } | null };

export type StopsQueryVariables = Exact<{ [key: string]: never; }>;


export type StopsQuery = { __typename?: 'Query', stops: Array<{ __typename?: 'Stop', stopId: string, name?: string | null, latitude?: number | null, longitude?: number | null, timezone?: string | null }> };

export type TripScheduleRowsQueryVariables = Exact<{
  tripId: Scalars['String']['input'];
  date: Scalars['Date']['input'];
}>;


export type TripScheduleRowsQuery = { __typename?: 'Query', trip?: { __typename?: 'TripInstance', route: { __typename?: 'Route', shortName?: string | null, longName?: string | null, agency?: { __typename?: 'Agency', timezone: string } | null }, scheduleRows: Array<{ __typename?: 'TripScheduleRow', sequenceNumber: number, arrivalTimeScheduled?: any | null, departureTimeScheduled?: any | null, stop: { __typename?: 'Stop', name?: string | null, timezone?: string | null } }>, vehiclePosition?: { __typename?: 'VehiclePosition', vehicleLabel?: string | null } | null } | null };

export type TripPolylineQueryVariables = Exact<{
  tripId: Scalars['String']['input'];
  date: Scalars['Date']['input'];
}>;


export type TripPolylineQuery = { __typename?: 'Query', trip?: { __typename?: 'TripInstance', shape?: string | null } | null };

export type VehiclePositionsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type VehiclePositionsSubscription = { __typename?: 'Subscription', vehiclePositions: Array<{ __typename?: 'VehiclePosition', vehicleId: string, vehicleLabel?: string | null, latitude: number, longitude: number, bearing?: number | null, speed?: number | null, status?: VehicleStopStatus | null, timestamp?: any | null, currentStop?: { __typename?: 'TripScheduleRow', arrivalTimeScheduled?: any | null, departureTimeScheduled?: any | null, headsign?: string | null, stop: { __typename?: 'Stop', name?: string | null, timezone?: string | null } } | null, trip: { __typename?: 'TripInstance', tripId: string, date: any, headsign?: string | null, route: { __typename?: 'Route', longName?: string | null, agency?: { __typename?: 'Agency', timezone: string } | null } } }> };


export const StopScheduleRowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StopScheduleRows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxRows"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stopId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleRows"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"max"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxRows"}}},{"kind":"Argument","name":{"kind":"Name","value":"includeLastStop"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trip"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"headsign"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"headsign"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalTimeScheduled"}},{"kind":"Field","name":{"kind":"Name","value":"departureTimeScheduled"}},{"kind":"Field","name":{"kind":"Name","value":"pickUp"}},{"kind":"Field","name":{"kind":"Name","value":"dropOff"}}]}}]}}]}}]} as unknown as DocumentNode<StopScheduleRowsQuery, StopScheduleRowsQueryVariables>;
export const StopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Stops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]} as unknown as DocumentNode<StopsQuery, StopsQueryVariables>;
export const TripScheduleRowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TripScheduleRows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"longName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduleRows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sequenceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"stop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalTimeScheduled"}},{"kind":"Field","name":{"kind":"Name","value":"departureTimeScheduled"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vehiclePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleLabel"}}]}}]}}]}}]} as unknown as DocumentNode<TripScheduleRowsQuery, TripScheduleRowsQueryVariables>;
export const TripPolylineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TripPolyline"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shape"}}]}}]}}]} as unknown as DocumentNode<TripPolylineQuery, TripPolylineQueryVariables>;
export const VehiclePositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"VehiclePositions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehiclePositions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleId"}},{"kind":"Field","name":{"kind":"Name","value":"vehicleLabel"}},{"kind":"Field","name":{"kind":"Name","value":"currentStop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"arrivalTimeScheduled"}},{"kind":"Field","name":{"kind":"Name","value":"departureTimeScheduled"}},{"kind":"Field","name":{"kind":"Name","value":"headsign"}},{"kind":"Field","name":{"kind":"Name","value":"stop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"trip"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longName"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"headsign"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"bearing"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<VehiclePositionsSubscription, VehiclePositionsSubscriptionVariables>;