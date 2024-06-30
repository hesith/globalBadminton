import { styles } from "@/styles/styles";
import { Text, Tooltip } from "@ui-kitten/components";
import React from 'react';

const ErrorTooltip = (props: any) => {
    return (
        <>
        <Tooltip style={styles.errorTooltip} anchor={props.anchor} visible={props.visible} onBackdropPress={props.backdropPress}>
            <Text>Erro</Text>
        </Tooltip>
        </>
    )
}

export default ErrorTooltip;