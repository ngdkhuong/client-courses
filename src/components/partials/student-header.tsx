import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ProfileMenu from '../elements/profile-menu';
import { selectIsLoggedIn, selectUserType } from '../../redux/reducers/authSlice';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { APP_LOGO } from '../../constants/common';
import SearchBar from '../../components/common/search-bar';
import { useModal } from '../../context/modal-context';
import LoginModal from './../pages/students/student-login-modal';
import RegisterModal from '../pages/students/student-register-modal';
// import InstructorLoginModal from './../pages/instructors/instructor-login-modal';
import SwitchUserButton from '../../components/common/switch-user-button';
import StudentHomePage from 'components/pages/students/student-home-page';
import InstructorDashboard from 'components/pages/instructors/instructor-dash-board';

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Courses', href: '/courses', current: false },
    { name: 'Tutors', href: '/tutors', current: false },
    { name: 'Community', href: '/community', current: false },
    { name: 'About', href: '/about', current: false },
    { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const StudentHeader: React.FC = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUserType);

    const { openModal, modalType, isOpen } = useModal();

    const handleNavigation = (item: any) => {
        navigation.forEach((navItem) => {
            navItem.current = navItem.href === item.href;
        });
    };

    return (
        <div className="bg-gray-100 border-b border-b-gray-300 ">
            <Disclosure as="nav" className="bg-white pl-8 pr-8 p-2 md:p-2 lg:p-3 lg:flex lg:justify-center">
                {({ open }) => (
                    <>
                        <div className="max-w-full sm:px-6 lg:px-2 md:w-full lg:w-full  ">
                            <div className="flex items-center justify-between md:h-14 lg:h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 ">
                                        <Link to="/">
                                            <img className="h-20" src={APP_LOGO} alt="KUONDEV" />
                                        </Link>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    onClick={() => handleNavigation(item)}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-blue-500 text-white font-semibold'
                                                            : 'text-blue-600 hover:text-blue-800 font-semibold hover:bg-gray-300 ',
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <SearchBar />
                                        </div>
                                    </div>
                                </div>
                                {isLoggedIn && user === 'student' ? (
                                    <div className="hidden md:ml-5 md:flex items-center justify-between">
                                        <div className="">
                                            <Link to="/dashboard">
                                                <Button size="medium" color="primary">
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className=" pl-3 ml-3 items-end">
                                            <ProfileMenu />
                                        </div>
                                        <div className="pl-3 ml-3">
                                            <SwitchUserButton />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="overflow-hidden">
                                        <div className="hidden h-8 w-64 lg:mt-3 lg:h-12 lg:w-72 md:flex">
                                            <div className="flex space-x-4">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => openModal('login')}
                                                    className="bg-blue-300 hover:bg-blue-500 text-xs lg:text-sm text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Login
                                                </Button>
                                                {isOpen && modalType === 'login' && <LoginModal />}
                                                <Button
                                                    variant="contained"
                                                    onClick={() => openModal('register')}
                                                    className="bg-blue-300 hover:bg-blue-500  text-xs lg:text-sm text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Register
                                                </Button>
                                                {isOpen && modalType === 'register' && <RegisterModal />}
                                                <Link to="/instructors">
                                                    <Button
                                                        variant="contained"
                                                        className="bg-purple-800 hover:bg-purple-900 text-xs text-white lg:text-sm font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                                    >
                                                        Teach on KUONDEV
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="-mr-2 flex md:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="lg:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => handleNavigation(item)}
                                        className={classNames(
                                            item.current
                                                ? 'bg-blue-gray-500 text-white'
                                                : 'text-blue-gray-600 hover:bg-gray-300 hover:text-blue-gray-800',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="mt-3 space-y-1 px-2">
                                    {isLoggedIn && user === 'student' ? (
                                        <div className="md:ml-5 md:flex items-center justify-between">
                                            <div className="">
                                                <Link to="/dashboard">
                                                    <Button size="medium" color="primary">
                                                        Dashboard
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div className=" pl-3 ml-3 items-end">
                                                <ProfileMenu />
                                            </div>
                                            <div className="pl-3 ml-3">
                                                <SwitchUserButton />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-4">
                                            <Button
                                                variant="contained"
                                                onClick={() => openModal('login')}
                                                className="bg-blue-300 hover:bg-blue-500 text-xs lg:text-sm text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Login
                                            </Button>
                                            {isOpen && modalType === 'login' && <LoginModal />}
                                            <Button
                                                variant="contained"
                                                onClick={() => openModal('register')}
                                                className="bg-blue-300 hover:bg-blue-500  text-xs lg:text-sm text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Register
                                            </Button>
                                            {isOpen && modalType === 'register' && <RegisterModal />}
                                            <Link to="/instructors">
                                                <Button
                                                    variant="contained"
                                                    className="bg-purple-800 hover:bg-purple-900 text-xs text-white lg:text-sm font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Teach on KUONDEV
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default StudentHeader;
