import React, { useState, useEffect } from 'react'
import { BaseUrl } from '../BaseUrl';
import $ from 'jquery';
import AllBikes from './AllBikes';

export default function BikesAdmin(props) {

    const [bikes, setbikes] = useState([])
    const [allBikesComponent, setallBikesComponent] = useState(true)

    async function getAllBikes() {
        let Bikes = await fetch(BaseUrl + 'bikes');
        let allBikes = await Bikes.json();

        if (allBikes) {
            setbikes(allBikes);
            console.log(allBikes);
        }
    }


    useEffect(() => {
        console.log(props.newState);
        if (props.newState === !allBikesComponent) {
            setallBikesComponent(!allBikesComponent);
        }
    }, [])

    $(document).ready(function () {
        $('.searchField').on('keyup', function () {
            var searchTerm = $(this).val().toLowerCase();
            $('#detailTbl tbody tr').each(function () {
                var lineStr = $(this).text().toLowerCase();
                if (lineStr.indexOf(searchTerm) === -1) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    });

    useEffect(() => {
        getAllBikes();
    }, [])

    return (
        <>
            <AllBikes bikes={bikes} newState={allBikesComponent} />
        </>
    )
}
