import React from 'react'
import {IMAGE_BASE_URL,POSTER_SIZE} from '../../Config'

const Poster = (props) => {
    return (
        <div className="hvrbox p-2">
            <h5>{props.poster.name}</h5>
            	<img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${props.poster.poster_path}`} alt="Mountains" class="hvrbox-layer_bottom"/>
	<div class="hvrbox-layer_top">
		<div class="hvrbox-text">{props.poster.overview}</div>
	</div>
        </div>
    )
}

export default Poster
