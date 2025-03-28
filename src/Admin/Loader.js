import React from 'react'

export default function Loader() {
    return (
        <>
            <div class="overlay"></div>
            <div class="page-loader-wrapper">
                <div class="loader">
                    <div class="m-t-30"><img class="zmdi-hc-spin" src="assets/images/loader.svg" width="48" height="48"
                        alt="Aero" /></div>
                    <p>Please wait...</p>
                </div>
            </div>
        </>
    )
}
