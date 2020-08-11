import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox(props) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {props.title}
                </Typography>

                <h2 className="infoBox__cases">
                    {props.cases}
                </h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {props.total} Total
            </Typography>
            </CardContent>
        </Card>
    )
}

<<<<<<< HEAD
export default InfoBox;
=======
export default InfoBox
>>>>>>> 0918e9012289426b76f0d87f36f20fe9e7db2560
