import { Popover, Text } from "@ui-kitten/components";
import React from 'react';

const Error = (props: any) => {
    return (
        <>
        <Popover anchor={props.anchor} visible={props.visible}>
            <Text>Erro</Text>
        </Popover>
        </>
    )
}

export default Error;