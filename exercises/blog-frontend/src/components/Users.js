import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

const Users = () => {
  const users = useSelector(state => state.users)

  return  (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.sort((userA, userB) => userB.blogs.length - userA.blogs.length).map(user =>
              <TableRow key={user.id}>
                <TableCell component={Link} to={`/users/${user.id}`}>{user.name}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users

