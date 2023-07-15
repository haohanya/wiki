import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import './style.css'

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={'header'}>
            <div className="container">
                <div className='header-info'>
                    <h1 className="title">{siteConfig.title}</h1>
                    <p className="subtitle">{siteConfig.tagline}</p>
                    <p className="description">I'm also a solution architect with a keen eye for designing workflows and
                        bringing doodles to life.</p>
                    <div className='buttons'>
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/intro">
                            Click here.
                        </Link>
                    </div>
                </div>
                <div className={'header-image'}>
                    <img src="/pages/img.png" alt="背景图片"/>
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <div className={'home'}>
            <HomepageHeader/>
        </div>
        // <Layout
        //     title={`Hello from ${siteConfig.title}`}
        //     description="Description will go into a meta tag in <head />">
        //     <HomepageHeader/>
        //     <main>
        //         {/*<HomepageFeatures/>*/}
        //     </main>
        // </Layout>
    );
}
