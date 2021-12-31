import { map } from "lodash";

jQuery(function ($) {
    //color each player country by his color
    var playerAColor = "blue";
    var playerBColor = "yellow";
    // Load patterns
    $("svg").each(function () {
        //countries of the player
        var flag = game_mode.map;
        var splitter = 0;
        for (let v in StateIndex) {
            if (flag == MapEnum.Egypt) {
                if (v == "US-WA") {
                    splitter = 1;
                    break;
                }
                if (splitter == 0) {
                    //color according to number of armies
                    if (armies<0){
                        //$(this).find("#" + v).css({ fill: playerBColor});
                    }else{
                        //$(this).find("#" + v).css({ fill: playerAColor});
                    }
                }
            }
            if (flag == MapEnum.USA) {
                if (v == "US-WA") {
                    splitter = 1;
                }
                if (splitter == 1) {
                    //color according to number of armies
                    if (armies<0){
                        //$(this).find("#" + v).css({ fill: playerBColor});
                    }else{
                        //$(this).find("#" + v).css({ fill: playerAColor});
                    }
                }
            }
        }
    });
    //armies number
    var v1 = 1;
    var nodes_selected = {

    };
    $('svg [data-toggle="tooltip"]').tooltip({
        title: function () {
            indexOfState = StateIndex[this.id];
            //absolute value of arr[indexOfstate]
            return this.id;
        },
        html: true,
        container: 'body'
    });
    if (game_mode.mode == ModeEnum.playing && turn == 1) {
        $('path').on("click", function () {
            if ($(this).attr("class") == "selected" && v1 == 2) {
                $(this).attr("class", "");
                nodes_selected.node_1 = null;
                v1 = 1;
            } else if (v1 == 1) {
                $(this).attr("class", "selected");
                nodes_selected.node_1 = $(this).attr("id");
                console.log(nodes_selected.node_1 + " " + v1);
                v1 = 2;
            } else if (v1 == 2) {
                $("#" + nodes_selected.node_1).attr("class", "");
                nodes_selected.node_2 = $(this).attr("id");
                console.log(nodes_selected.node_2 + " " + v1);
                v1 = 1;
                localStorage.setItem("nodes_selected", JSON.stringify(nodes_selected));
            }
        });
    }
});