import React from 'react'

export default function Table(props) {
    return (
        <tbody>
            {props.data.map(bike =>
                <tr>
                    <td class="pt-3-half" contenteditable="true">{bike.bike_id}</td>
                    <td class="pt-3-half" contenteditable="true">{bike.company}</td>
                    <td class="pt-3-half" contenteditable="true">{bike.model}</td>
                    <td class="pt-3-half" contenteditable="true">{bike.chasis_no}</td>
                    <td class="pt-3-half" contenteditable="true">{bike.id_city}</td>
                    <td class="pt-3-half" contenteditable="true">{bike.status}</td>
                    <td>
                        <span class="table-remove d-flex">
                            <button type="button" class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                            <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
                        </span>
                    </td>
                </tr>
            )}

            {/* <tr>
                <td class="pt-3-half" contenteditable="true">2</td>
                <td class="pt-3-half" contenteditable="true">45</td>
                <td class="pt-3-half" contenteditable="true">Insectus</td>
                <td class="pt-3-half" contenteditable="true">USA</td>
                <td class="pt-3-half" contenteditable="true">San Francisco</td>
                <td class="pt-3-half">
                    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
                    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
                </td>
                <td>
                    <span class="table-remove d-flex">
                        <button type="button" class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                        <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="pt-3-half" contenteditable="true">3</td>
                <td class="pt-3-half" contenteditable="true">26</td>
                <td class="pt-3-half" contenteditable="true">Isotronic</td>
                <td class="pt-3-half" contenteditable="true">Germany</td>
                <td class="pt-3-half" contenteditable="true">Frankfurt am Main</td>
                <td class="pt-3-half">
                    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
                    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
                </td>
                <td>
                    <span class="table-remove d-flex">
                        <button type="button" class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                        <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
                    </span>
                </td>
            </tr>

            <tr class="hide">
                <td class="pt-3-half" contenteditable="true">4</td>
                <td class="pt-3-half" contenteditable="true">31</td>
                <td class="pt-3-half" contenteditable="true">Portica</td>
                <td class="pt-3-half" contenteditable="true">United Kingdom</td>
                <td class="pt-3-half" contenteditable="true">London</td>
                <td class="pt-3-half">
                    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
                    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
                </td>
                <td>
                    <span class="table-remove d-flex">
                        <button type="button" class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                        <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
                    </span>

                </td>
            </tr>

            <tr class="hide">
                <td class="pt-3-half" contenteditable="true">4</td>
                <td class="pt-3-half" contenteditable="true">31</td>
                <td class="pt-3-half" contenteditable="true">Portica</td>
                <td class="pt-3-half" contenteditable="true">United Kingdom</td>
                <td class="pt-3-half" contenteditable="true">London</td>
                <td class="pt-3-half">
                    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
                    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
                </td>
                <td>
                    <span class="table-remove d-flex">
                        <button type="button" class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                        <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
                    </span>

                </td>
            </tr>
            <tr class="hide">
                <td class="pt-3-half" contenteditable="true">4</td>
                <td class="pt-3-half" contenteditable="true">31</td>
                <td class="pt-3-half" contenteditable="true">Portica</td>
                <td class="pt-3-half" contenteditable="true">United Kingdom</td>
                <td class="pt-3-half" contenteditable="true">London</td>
                <td class="pt-3-half">
                    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
                    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
                </td>
                <td>
                    <span class="table-remove d-flex">
                        <button type="button" class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                        <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
                    </span>

                </td>
            </tr>
            <tr class="hide">
                <td class="pt-3-half" contenteditable="true">4</td>
                <td class="pt-3-half" contenteditable="true">31</td>
                <td class="pt-3-half" contenteditable="true">Portica</td>
                <td class="pt-3-half" contenteditable="true">United Kingdom</td>
                <td class="pt-3-half" contenteditable="true">London</td>
                <td class="pt-3-half">
                    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
                    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
                </td>
                <td>
                    <span class="table-remove d-flex">
                        <button type="button" class="btn update btn-rounded btn-sm my-0 outline">Update </button>
                        <button type="button" class="btn delete btn-rounded btn-sm my-0 outline ml-1">Remove </button>
                    </span>

                </td>
            </tr> */}
        </tbody>

    )
}
