'use client';
import {Provider} from 'react-redux';
import {store} from './ReduxStore';
import UserLayout from '@/layouts/UserLayout';

export default function ReduxProvider({children, authorized }: {children: React.ReactNode, authorized: number}) {
    return (
        <Provider store={store}>
            <UserLayout authorized={authorized}>
                {children}
            </UserLayout>
        </Provider>
    )
}