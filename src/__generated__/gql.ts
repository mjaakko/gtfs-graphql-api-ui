/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query StopScheduleRows($stopId: String!, $maxRows: Int!) {\n        stop(id: $stopId) {\n            scheduleRows(max: $maxRows, includeLastStop: false) {\n                trip {\n                    tripId\n                    date\n                    headsign\n                    route {\n                        agency {\n                            timezone\n                        }\n                    }\n                }\n                headsign\n                arrivalTimeScheduled\n                departureTimeScheduled\n                pickUp\n                dropOff\n            }\n        }\n    }\n": types.StopScheduleRowsDocument,
    "\n  query Stops {\n    stops {\n        stopId\n        name\n        latitude\n        longitude\n        timezone\n    }\n  }\n": types.StopsDocument,
    "\n    query TripScheduleRows($tripId: String!, $date: Date!) {\n        trip(id: $tripId, date: $date) {\n            route {\n              agency {\n                timezone\n              }\n              shortName\n              longName\n            }\n            scheduleRows {\n              sequenceNumber\n              stop {\n                name\n                timezone\n              }\n              arrivalTimeScheduled\n              departureTimeScheduled\n            }\n            vehiclePosition {\n              vehicleId\n              vehicleLabel\n            }\n        }\n    }\n": types.TripScheduleRowsDocument,
    "\n  query TripPolyline($tripId: String!, $date: Date!) {\n    trip(id: $tripId, date: $date) {\n      shape\n    }\n  }\n": types.TripPolylineDocument,
    "\n  subscription VehiclePositions {\n    vehiclePositions {\n        vehicleId\n        vehicleLabel\n        currentStop {\n            sequenceNumber\n            arrivalTimeScheduled\n            departureTimeScheduled\n            headsign\n            stop {\n                name\n                timezone\n            }\n        }\n        trip {\n            tripId\n            date\n            route {\n                longName\n                agency {\n                    timezone\n                }\n            }\n            headsign\n        }\n        latitude\n        longitude\n        bearing\n        speed\n        status\n        timestamp\n    }\n  }\n": types.VehiclePositionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query StopScheduleRows($stopId: String!, $maxRows: Int!) {\n        stop(id: $stopId) {\n            scheduleRows(max: $maxRows, includeLastStop: false) {\n                trip {\n                    tripId\n                    date\n                    headsign\n                    route {\n                        agency {\n                            timezone\n                        }\n                    }\n                }\n                headsign\n                arrivalTimeScheduled\n                departureTimeScheduled\n                pickUp\n                dropOff\n            }\n        }\n    }\n"): (typeof documents)["\n    query StopScheduleRows($stopId: String!, $maxRows: Int!) {\n        stop(id: $stopId) {\n            scheduleRows(max: $maxRows, includeLastStop: false) {\n                trip {\n                    tripId\n                    date\n                    headsign\n                    route {\n                        agency {\n                            timezone\n                        }\n                    }\n                }\n                headsign\n                arrivalTimeScheduled\n                departureTimeScheduled\n                pickUp\n                dropOff\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Stops {\n    stops {\n        stopId\n        name\n        latitude\n        longitude\n        timezone\n    }\n  }\n"): (typeof documents)["\n  query Stops {\n    stops {\n        stopId\n        name\n        latitude\n        longitude\n        timezone\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query TripScheduleRows($tripId: String!, $date: Date!) {\n        trip(id: $tripId, date: $date) {\n            route {\n              agency {\n                timezone\n              }\n              shortName\n              longName\n            }\n            scheduleRows {\n              sequenceNumber\n              stop {\n                name\n                timezone\n              }\n              arrivalTimeScheduled\n              departureTimeScheduled\n            }\n            vehiclePosition {\n              vehicleId\n              vehicleLabel\n            }\n        }\n    }\n"): (typeof documents)["\n    query TripScheduleRows($tripId: String!, $date: Date!) {\n        trip(id: $tripId, date: $date) {\n            route {\n              agency {\n                timezone\n              }\n              shortName\n              longName\n            }\n            scheduleRows {\n              sequenceNumber\n              stop {\n                name\n                timezone\n              }\n              arrivalTimeScheduled\n              departureTimeScheduled\n            }\n            vehiclePosition {\n              vehicleId\n              vehicleLabel\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TripPolyline($tripId: String!, $date: Date!) {\n    trip(id: $tripId, date: $date) {\n      shape\n    }\n  }\n"): (typeof documents)["\n  query TripPolyline($tripId: String!, $date: Date!) {\n    trip(id: $tripId, date: $date) {\n      shape\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription VehiclePositions {\n    vehiclePositions {\n        vehicleId\n        vehicleLabel\n        currentStop {\n            sequenceNumber\n            arrivalTimeScheduled\n            departureTimeScheduled\n            headsign\n            stop {\n                name\n                timezone\n            }\n        }\n        trip {\n            tripId\n            date\n            route {\n                longName\n                agency {\n                    timezone\n                }\n            }\n            headsign\n        }\n        latitude\n        longitude\n        bearing\n        speed\n        status\n        timestamp\n    }\n  }\n"): (typeof documents)["\n  subscription VehiclePositions {\n    vehiclePositions {\n        vehicleId\n        vehicleLabel\n        currentStop {\n            sequenceNumber\n            arrivalTimeScheduled\n            departureTimeScheduled\n            headsign\n            stop {\n                name\n                timezone\n            }\n        }\n        trip {\n            tripId\n            date\n            route {\n                longName\n                agency {\n                    timezone\n                }\n            }\n            headsign\n        }\n        latitude\n        longitude\n        bearing\n        speed\n        status\n        timestamp\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;