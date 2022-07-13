import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

export default function UserPage() {

  const {id} = useParams();

  console.log( id )

  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}
