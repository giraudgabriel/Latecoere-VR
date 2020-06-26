import React from 'react'
import Menu from '../components/Menu'

export default function NotFound() {
    return (
        <div>
            <Menu />
            <h1 className="alert alert-danger text-center">Página não encontrada 404</h1>
        </div>
    )
}
