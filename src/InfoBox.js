import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';
import numeral from 'numeral';

function InfoBox(props) {
    return (
        <Card
            onClick={props.onClick} className={`infoBox ${props.active && "infoBox--selected"} ${props.isRed && "infoBox--red"}`}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {props.title}
                </Typography>

                <h2 className={`infoBox__cases ${!props.isRed && "infoBox__cases--green"}`}>
                    {props.cases}
                </h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {numeral(props.total).format("0,0")} Total
            </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
